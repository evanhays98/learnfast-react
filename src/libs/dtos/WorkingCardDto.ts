import { WorkingCardHistoryEnums } from '../enums';
import { Card } from './CardDto';
import { BaseEntity } from './AuthUser';

export interface AnswerWorkingCard {
  answer: string;
}

export interface LastUsageUser {
  pseudo: string;
  lastUsage: Date;
}

export interface WorkingCard extends BaseEntity {
  ownerId: string;
  card?: Card;
  cardId: string;
  points: number;
  maxPoints: number;
  isValidate: boolean;
  startedAt?: Date;
  history: WorkingCardHistoryEnums[];
}
