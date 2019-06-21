import { Ui } from 'src/app/models/ui';
import { Action } from '@ngrx/store';
import { UiActionTypes, SetLoggedUser, OpenBoard } from './actions';
import { getItemFromLocalStorage } from 'src/app/services/local-storage';

export const initialState: Ui = {
  loggedUser: "user1",
  isDashboardPage: false,
  board: null
}

function reducer(state = initialState, action: Action): Ui {
  switch(action.type) {
    case UiActionTypes.SET_LOGGED_USER: {
      return {
        ...state, loggedUser: (action as SetLoggedUser).userId
      }
    }
    case UiActionTypes.OPEN_BOARD: {
      return {
        ...state, board: (action as OpenBoard).board
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