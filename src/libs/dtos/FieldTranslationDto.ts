import { Card } from './CardDto';
import { BaseEntity } from './AuthUser';

export interface CreateFieldTranslation {
  chapterId: string;

  sentence: string;

  translation: string;

  information?: string;
}

export interface FieldTranslation extends BaseEntity {
  ownerId: string;
  sentence: string;
  answers: string[];
  translation: string;
  information?: string;
  card?: Card;
}
