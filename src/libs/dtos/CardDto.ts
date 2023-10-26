import { CardType } from '../enums';
import { BaseEntity } from './AuthUser';
import { Chapter } from './ChapterDto';
import { WorkingCard } from './WorkingCardDto';

export interface FieldTranslation {
  sentence: string;
  translation: string;
  information?: string;
}


export interface CreateCard {
  type: CardType;
  chapterId: string;
  field: FieldTranslation;
}

export interface UpdateCard {
  type?: CardType;

  field?: FieldTranslation;
}

export interface Card extends BaseEntity {
  ownerId: string;
  type: CardType;
  chapter?: Chapter;
  chapterId: string;
  fieldTranslation?: FieldTranslation;
  fieldId: string;
  workingCards: WorkingCard[];
}

