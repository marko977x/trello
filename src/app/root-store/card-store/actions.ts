import { Action } from '@ngrx/store';
import { Card } from 'src/app/models/card';

export enum CardActionTypes {
  LOAD_CARDS = '[CARD] Load Cards',
  LOAD_CARDS_SUCCESS = '[CARD] Load Cards Success',
  LOAD_CARDS_ERROR = '[CARD] Load Cards Error'
}

export class LoadCards implements Action {
  readonly type = CardActionTypes.LOAD_CARDS;
}

export class LoadCardsSuccess implements Action {
  readonly type = CardActionTypes.LOAD_CARDS_SUCCESS;
  constructor(public cards: Card[]) {}
}

export class LoadCardsError implements Action {
  readonly type = CardActionTypes.LOAD_CARDS_ERROR;
  constructor(public error: any) {}
}