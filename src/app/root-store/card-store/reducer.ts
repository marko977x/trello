import { initialState, CardState, CardAdapter } from "./state";
import { Action } from '@ngrx/store';
import { CardActionTypes, LoadCardsSuccess, LoadCardsError } from './actions';
import { ChecklistActionTypes, DeleteChecklist } from '../checklist-store/actions';
import { Update } from '@ngrx/entity';
import { Card } from 'src/app/models/card';

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
    case ChecklistActionTypes.DELETE_CHECKLIST: {
      const {cardId, checklistId} = (action as DeleteChecklist);
      const checklists: string[] = state.entities[cardId].checklists.filter(item => item !== checklistId);
      const update: Update<Card> = {
        id: cardId,
        changes: { checklists }
      };

      return CardAdapter.updateOne(update, state);
    }
    default: return state;
  }
}

export { reducer as CardReducer };