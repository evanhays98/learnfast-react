import { CardType } from '../enums';
import { BaseEntity } from './AuthUser';
import { FieldTranslation } from './FieldTranslationDto';
import { Chapter } from './ChapterDto';
import { WorkingCard } from './WorkingCardDto';

export interface CreateCard {
  type: CardType;
  fieldRef: string;
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
