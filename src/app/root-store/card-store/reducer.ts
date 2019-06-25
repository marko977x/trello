import { initialState, CardState, CardAdapter } from "./state";
import { Action } from '@ngrx/store';
import { CardActionTypes, LoadCardsSuccess, SaveDescription, DeleteCardSuccess, ChangeCardTitle, AddCard, AddCardError } from './actions';
import { ChecklistActionTypes, AddChecklistSuccess, DeleteChecklistSuccess } from '../checklist-store/actions';
import { Update } from '@ngrx/entity';
import { Card } from 'src/app/models/card';
import { ListActionTypes, DeleteListSuccess, SwapCards, SwapCardsError } from '../list-store/actions';

function reducer(state = initialState, action: Action): CardState {
  switch(action.type) {
    case CardActionTypes.LOAD_CARDS_SUCCESS: {
      return CardAdapter.addAll((action as LoadCardsSuccess).cards, state)
    }
    case ChecklistActionTypes.DELETE_CHECKLIST_SUCCESS: {
      const {cardId, checklistId} = (action as DeleteChecklistSuccess);
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
    case CardActionTypes.DELETE_CARD_SUCCESS: {
      return CardAdapter.removeOne((action as DeleteCardSuccess).cardId, state);
    }
    case CardActionTypes.ADD_CARD: {
      return CardAdapter.addOne((action as AddCard).card, state);
    }
    case CardActionTypes.ADD_CARD_ERROR: {
      return CardAdapter.removeOne((action as AddCardError).card.id, state);
    }
    case ChecklistActionTypes.ADD_CHECKLIST_SUCCESS: {
      const {cardId, checklist} = (action as AddChecklistSuccess);
      const update: Update<Card> = {
        id: cardId,
        changes: {checklists: [...state.entities[cardId].checklists, checklist.id]}
      }
      return CardAdapter.updateOne(update, state);
    }
    case CardActionTypes.CHANGE_CARD_TITLE: {
      const {cardId, title} = (action as ChangeCardTitle);
      const update: Update<Card> = {
        id: cardId,
        changes: {title}
      }
      return CardAdapter.updateOne(update, state);
    }
    case ListActionTypes.DELETE_LIST_SUCCESS: {
      const {listId} = (action as DeleteListSuccess);
      const cards: string[] = [];
      for(let key in state.entities) {
        if(state.entities[key].list === listId) cards.push(key);
      }
      return CardAdapter.removeMany(cards, state);
    }
    case ListActionTypes.SWAP_CARDS: {
      const {cardId, container} = (action as SwapCards);
      return {...state, entities: {
        ...state.entities,
        [cardId]: {
          ...state.entities[cardId],
          list: container.current
        }
      }}
    }
    case ListActionTypes.SWAP_CARDS_ERROR: {
      const {cardId, container} = (action as SwapCardsError);
      return {...state, entities: {
        ...state.entities,
        [cardId]: {
          ...state.entities[cardId],
          list: container.previous
        }
      }}
    }
    default: return state;
  }
}

export { reducer as CardReducer };