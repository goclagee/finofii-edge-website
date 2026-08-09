import type { CaseStudy, ServiceType } from '@/types/case-study';
import type { IndustryType } from '@/types/dashboard';
import type { ContentItem, ContentType } from '@/types/content';

/**
 * Filters case studies by industry and service type.
 * Returns all items if no filters are active.
 */
export function filterCaseStudies(
  items: CaseStudy[],
  filters: { industry?: IndustryType[]; serviceType?: ServiceType[] }
): CaseStudy[] {
  const { industry, serviceType } = filters;

  const hasIndustryFilter = industry && industry.length > 0;
  const hasServiceTypeFilter = serviceType && serviceType.length > 0;

  if (!hasIndustryFilter && !hasServiceTypeFilter) {
    return items;
  }

  return items.filter((item) => {
    const matchesIndustry = !hasIndustryFilter || industry.includes(item.industry);
    const matchesServiceType = !hasServiceTypeFilter || serviceType.includes(item.serviceType);
    return matchesIndustry && matchesServiceType;
  });
}

/**
 * Filters content items by content type(s).
 * Returns all items if no filter is active.
 * Applies pagination (page, pageSize).
 */
export function filterContent(
  items: ContentItem[],
  filters: { types?: ContentType[] },
  pagination: { page: number; pageSize: number }
): { items: ContentItem[]; total: number; totalPages: number } {
  const { types } = filters;
  const hasTypeFilter = types && types.length > 0;

  const filtered = hasTypeFilter
    ? items.filter((item) => types.includes(item.type))
    : items;

  const total = filtered.length;
  const pageSize = Math.max(1, pagination.pageSize);
  const totalPages = Math.ceil(total / pageSize);
  const page = Math.max(1, Math.min(pagination.page, totalPages || 1));

  const startIndex = (page - 1) * pageSize;
  const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

  return {
    items: paginatedItems,
    total,
    totalPages,
  };
}
