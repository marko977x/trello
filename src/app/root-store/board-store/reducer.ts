import { initialState, BoardState, BoardAdapter } from './state';
import { Action } from '@ngrx/store';
import { BoardActionTypes, LoadBoardsSuccess, LoadBoardsError } from './actions';

function reducer(state = initialState, action: Action): BoardState {
  switch(action.type) {
    case BoardActionTypes.LOAD_BOARDS: {
      return {
        ...state, loaded: false, error: null 
      }
    }
    case BoardActionTypes.LOAD_BOARDS_SUCCESS: {
      return BoardAdapter.addAll((action as LoadBoardsSuccess).boards, {
        ...state, loaded: true, error: null
      });
    }
    case BoardActionTypes.LOAD_BOARDS_ERROR: {
      return {
        ...state, loaded: false, error: (action as LoadBoardsError).error
      }
    }
    default: return state;
  }
}

export { reducer as BoardReducer };