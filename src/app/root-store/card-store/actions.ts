import { Action } from '@ngrx/store';
import { Card } from 'src/app/models/card';

export enum CardActionTypes {
  LOAD_CARDS = '[CARD] Load Cards',
  LOAD_CARDS_SUCCESS = '[CARD] Load Cards Success',
  SAVE_DESCRIPTION = '[CARD] Save Description',
  SAVE_DESCRIPTION_ERROR = '[CARD] Save Description Error',
  DELETE_CARD = '[CARD] Delete Card',
  DELETE_CARD_SUCCESS = '[CARD] Delete Card Success',
  ADD_CARD = '[CARD] Add Card',
  ADD_CARD_SUCCESS = '[CARD] Add Card Success',
  ADD_CARD_ERROR = '[CARD] Add Card Error',
  CHANGE_CARD_TITLE = '[CARD] Change Card Title',
  CHANGE_CARD_TITLE_ERROR = '[CARD] Change Card Title Error'
}

export class LoadCards implements Action {
  readonly type = CardActionTypes.LOAD_CARDS;
}

export class LoadCardsSuccess implements Action {
  readonly type = CardActionTypes.LOAD_CARDS_SUCCESS;
  constructor(public cards: Card[]) {}
}

export class SaveDescription implements Action {
  readonly type = CardActionTypes.SAVE_DESCRIPTION;
  constructor(public cardId: string, public description: string) {}
}

export class SaveDescriptionError implements Action {
  readonly type = CardActionTypes.SAVE_DESCRIPTION_ERROR;
  constructor(public cardId: string, public description: string) {}
}

export class DeleteCard implements Action {
  readonly type = CardActionTypes.DELETE_CARD;
  constructor(public listId: string, public cardId: string) {}
}

export class DeleteCardSuccess implements Action {
  readonly type = CardActionTypes.DELETE_CARD_SUCCESS;
  constructor(public listId: string, public cardId: string) {}
}

export class AddCard implements Action {
  readonly type = CardActionTypes.ADD_CARD;
  constructor(public listId: string, public card: Card) {}
}

export class AddCardError implements Action {
  readonly type = CardActionTypes.ADD_CARD_ERROR;
  constructor(public listId: string, public card: Card) {}
}

export class AddCardSuccess implements Action {
  readonly type = CardActionTypes.ADD_CARD_SUCCESS;
  constructor(public listId: string, public card: Card) {}
}

export class ChangeCardTitle implements Action {
  readonly type = CardActionTypes.CHANGE_CARD_TITLE;
  constructor(public cardId: string, public title: string) {}
}

export class ChangeCardTitleError implements Action {
  readonly type = CardActionTypes.CHANGE_CARD_TITLE_ERROR;
  constructor(public cardId: string, public title: string) {}
}