import { Action } from '@ngrx/store';
import { Card } from 'src/app/models/card';

export enum CardActionTypes {
  LOAD_CARDS = '[CARD] Load Cards',
  LOAD_CARDS_SUCCESS = '[CARD] Load Cards Success',
  LOAD_CARDS_ERROR = '[CARD] Load Cards Error',
  SAVE_DESCRIPTION = '[CARD] Save Description',
  DELETE_CARD = '[CARD] Delete Card',
  ADD_CARD = '[CARD] Add Card'
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

export class SaveDescription implements Action {
  readonly type = CardActionTypes.SAVE_DESCRIPTION;
  constructor(public cardId: string, public description: string) {}
}

export class DeleteCard implements Action {
  readonly type = CardActionTypes.DELETE_CARD;
  constructor(public listId: string, public cardId: string) {}
}

export class AddCard implements Action {
  readonly type = CardActionTypes.ADD_CARD;
  constructor(public listId: string, public card: Card) {}
}