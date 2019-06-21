import { initialState, CardState, CardAdapter } from "./state";
import { Action } from '@ngrx/store';
import { CardActionTypes, LoadCardsSuccess, LoadCardsError } from './actions';

function reducer(state = initialState, action: Action): CardState {
  switch(action.type) {
    case CardActionTypes.LOAD_CARDS: {
      return {
        ...state, loaded: false, error: null 
      }
    }
    case CardActionTypes.LOAD_CARDS_SUCCESS: {
      return CardAdapter.addAll((action as LoadCardsSuccess).cards, {
        ...state, loaded: true, error: null
      })
    }
    case CardActionTypes.LOAD_CARDS_ERROR: {
      return {
        ...state, loaded: false, error: (action as LoadCardsError).error
      }
    }
    default: return state;
  }
}

export { reducer as CardReducer };