import { Action } from '@ngrx/store';
import { Board } from 'src/app/models/board';

export enum UiActionTypes {
  SET_LOGGED_USER = '[UI] Set Logged User',
  OPEN_BOARD = '[UI] Open Board',
  NAVIGATE_TO_DASHBOARD = '[UI] Navigate To Dashboard',
  CLEAR_UI_STORE = '[UI] Clear Ui Store'
}

export class SetLoggedUser implements Action {
  readonly type = UiActionTypes.SET_LOGGED_USER;
  constructor(public userId: string) {}
}

export class OpenBoard implements Action {
  readonly type = UiActionTypes.OPEN_BOARD;
  constructor(public boardId: string) {}
}

export class NavigateToDashboard implements Action {
  readonly type = UiActionTypes.NAVIGATE_TO_DASHBOARD;
  constructor() {}
}

export class ClearUiStore implements Action {
  readonly type = UiActionTypes.CLEAR_UI_STORE;
  constructor() {}
}