import { Ui } from 'src/app/models/ui';
import { Action } from '@ngrx/store';
import { UiActionTypes, SetLoggedUser, OpenBoard } from './actions';
import { getItemFromLocalStorage } from 'src/app/services/local-storage';

export const initialState: Ui = {
  loggedUser: "",
  isDashboardPage: false,
  boardId: ""
}

function reducer(state = initialState, action: Action): Ui {
  switch(action.type) {
    case UiActionTypes.SET_LOGGED_USER: {
      return {
        ...state, loggedUser: (action as SetLoggedUser).userId, isDashboardPage: true
      }
    }
    case UiActionTypes.OPEN_BOARD: {
      return {
        ...state, boardId: (action as OpenBoard).boardId, isDashboardPage: false
      }
    }
    case UiActionTypes.NAVIGATE_TO_DASHBOARD: {
      return {...state, isDashboardPage: true}
    }
    case UiActionTypes.CLEAR_UI_STORE: {
      return {
        boardId: "",
        isDashboardPage: false,
        loggedUser: ""
      }
    }
    default: {
      const ui: Ui = getItemFromLocalStorage('ui');
      if(ui) return ui;
      else return state;
    };
  }
}

export { reducer as UiReducer };