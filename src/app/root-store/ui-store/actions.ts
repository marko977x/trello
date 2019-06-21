import { Action } from '@ngrx/store';
import { Board } from 'src/app/models/board';

export enum UiActionTypes {
  SET_LOGGED_USER = '[UI] Set Logged User',
  OPEN_BOARD = '[UI] Open Board'
}

export class SetLoggedUser implements Action {
  readonly type = UiActionTypes.SET_LOGGED_USER;
  constructor(public userId: string) {}
}

export class OpenBoard implements Action {
  readonly type = UiActionTypes.OPEN_BOARD;
  constructor(public board: Board) {}
}