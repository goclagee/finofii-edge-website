/**
 * CRM Connector - Syncs lead submissions to configured CRM
 * Implements exponential backoff retry with queue on failure.
 * User never sees sync failure — confirmation is shown immediately.
 */

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;       // ms
  maxDelay: number;        // ms
  backoffMultiplier: number;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 5,
  baseDelay: 1000,
  maxDelay: 30000,
  backoffMultiplier: 2,
};

export interface LeadPayload {
  entityType: string;
  revenueBand: string;
  currentTool: string;
  timezone: string;
  email: string;
  companyName?: string;
}

export interface CRMSyncResult {
  success: boolean;
  leadId?: string;
  error?: string;
  queued?: boolean;
}

// In-memory retry queue (in production, use a persistent queue)
const retryQueue: Array<{ payload: LeadPayload; attempts: number; nextAttempt: number }> = [];

/**
 * Calculates the delay for a given retry attempt using exponential backoff.
 * delay = min(baseDelay * multiplier^attempt, maxDelay)
 */
export function calculateBackoffDelay(
  attempt: number,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): number {
  const delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt);
  return Math.min(delay, config.maxDelay);
}

/**
 * Syncs a lead submission to the CRM.
 * On failure, queues for retry with exponential backoff.
 * Returns success to caller regardless of CRM sync status.
 */
export async function syncLeadToCRM(
  payload: LeadPayload,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<CRMSyncResult> {
  const leadId = generateLeadId();

  try {
    await sendToCRM(payload);
    return { success: true, leadId };
  } catch (error) {
    // Queue for retry — user still gets success
    queueForRetry(payload, config);
    return { success: true, leadId, queued: true };
  }
}

/**
 * Sends lead data to the CRM API.
 * In production, this would make an HTTP call to HubSpot/Pipedrive.
 */
export async function sendToCRM(payload: LeadPayload): Promise<void> {
  const crmEndpoint = process.env.CRM_API_URL;
  if (!crmEndpoint) {
    throw new Error('CRM_API_URL not configured');
  }

  const response = await fetch(crmEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`CRM sync failed: ${response.status}`);
  }
}

/**
 * Triggers Slack and WhatsApp notifications for a new lead.
 */
export async function sendNotifications(payload: LeadPayload): Promise<void> {
  const slackWebhook = process.env.SLACK_WEBHOOK_URL;
  const whatsappApiUrl = process.env.WHATSAPP_API_URL;

  const promises: Promise<void>[] = [];

  if (slackWebhook) {
    promises.push(
      fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `New lead: ${payload.email} (${payload.entityType}, ${payload.revenueBand})`,
        }),
      }).then(() => undefined)
    );
  }

  if (whatsappApiUrl) {
    promises.push(
      fetch(whatsappApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `New lead: ${payload.email} - ${payload.companyName || 'N/A'}`,
        }),
      }).then(() => undefined)
    );
  }

  await Promise.allSettled(promises);
}

/**
 * Queues a failed submission for retry.
 */
function queueForRetry(payload: LeadPayload, config: RetryConfig): void {
  retryQueue.push({
    payload,
    attempts: 0,
    nextAttempt: Date.now() + config.baseDelay,
  });
}

/**
 * Processes the retry queue with exponential backoff.
 * In production, this would be called by a background worker/cron.
 */
export async function processRetryQueue(
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<void> {
  const now = Date.now();
  const readyItems = retryQueue.filter((item) => item.nextAttempt <= now);

  for (const item of readyItems) {
    try {
      await sendToCRM(item.payload);
      // Remove from queue on success
      const index = retryQueue.indexOf(item);
      if (index > -1) retryQueue.splice(index, 1);
    } catch {
      item.attempts += 1;
      if (item.attempts >= config.maxRetries) {
        // Max retries exhausted — log and remove
        console.error(`CRM sync failed after ${config.maxRetries} retries for:`, item.payload.email);
        const index = retryQueue.indexOf(item);
        if (index > -1) retryQueue.splice(index, 1);
      } else {
        // Schedule next retry with backoff
        item.nextAttempt = now + calculateBackoffDelay(item.attempts, config);
      }
    }
  }
}

/**
 * Returns the current retry queue (for testing/monitoring).
 */
export function getRetryQueue() {
  return [...retryQueue];
}

/**
 * Clears the retry queue (for testing).
 */
export function clearRetryQueue(): void {
  retryQueue.length = 0;
}

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
