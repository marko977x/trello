import { initialState, CardState, CardAdapter } from "./state";
import { Action } from '@ngrx/store';
import { CardActionTypes, LoadCardsSuccess, LoadCardsError, SaveDescription, DeleteCard, AddCard } from './actions';
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
    case CardActionTypes.SAVE_DESCRIPTION: {
      const {cardId, description} = (action as SaveDescription);
      const update: Update<Card> = {
        id: cardId,
        changes: {description}
      }
      return CardAdapter.updateOne(update, state);
    }
    case CardActionTypes.DELETE_CARD: {
      return CardAdapter.removeOne((action as DeleteCard).cardId, state);
    }
    case CardActionTypes.ADD_CARD: {
      return CardAdapter.addOne((action as AddCard).card, state);
    }
    default: return state;
  }
}

export { reducer as CardReducer };