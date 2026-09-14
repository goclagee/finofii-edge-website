import type { MonthIndex } from './dashboard';
import type { EntityType } from './lead';

export type ContentType = 'blog' | 'guide' | 'template' | 'tax_calendar';

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  type: ContentType;
  publishDate: string;
  excerpt: string;
  category: string;
  tags: string[];
}

export interface FilingDeadline {
  month: MonthIndex;
  name: string;
  dueDate: string;       // "MM/DD" format
  description: string;   // One sentence
  entityTypes: EntityType[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;     // Optional — falls back to an initials avatar
  bio?: string;          // Optional — max 150 chars
  order: number;
}
