import { Card } from './CardDto';
import { BaseEntity } from './AuthUser';

export interface CreateChapter {
  title: string;
  description: string;
}

export class UpdateChapter {
  title?: string;
  description?: string;
  lng?: string;
}

export interface Chapter extends BaseEntity {
  ownerId: string;
  title: string;
  description: string;
  cards?: Card[];
  lng: string;
}
