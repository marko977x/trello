import { initialState, ListState, ListAdapter } from './state';
import { Action } from '@ngrx/store';
import { ListActionTypes, LoadLists, LoadListsSuccess, LoadListsError, AddList, DeleteList } from './actions';
import { CardActionTypes, DeleteCard, AddCard } from '../card-store/actions';
import { List } from 'src/app/models/list';
import { Update } from '@ngrx/entity';

function reducer(state = initialState, action: Action): ListState {
  switch(action.type) {
    case ListActionTypes.LOAD_LISTS: {
      return {
        ...state, loaded: false, error: null 
      }
    }
    case ListActionTypes.LOAD_LISTS_SUCCESS: {
      return ListAdapter.addAll((action as LoadListsSuccess).lists, {
        ...state, loaded: true, error: null
      })
    }
    case ListActionTypes.LOAD_LISTS_ERROR: {
      return {
        ...state, loaded: false, error: (action as LoadListsError).error
      }
    }
    case CardActionTypes.DELETE_CARD: {
      const {cardId, listId} = (action as DeleteCard);
      let cards: string[] = state.entities[listId].cards.filter(card => card !== cardId);
      const update: Update<List> = {
        id: listId,
        changes: {cards}
      }
      return ListAdapter.updateOne(update, state);
    }
    case CardActionTypes.ADD_CARD: {
      const {card, listId} = (action as AddCard);
      const cardId: string = card.id;
      const update: Update<List> = {
        id: listId,
        changes: {cards: [...state.entities[listId].cards, cardId]}
      }
      return ListAdapter.updateOne(update, state);
    }
    case ListActionTypes.ADD_LIST: {
      return ListAdapter.addOne((action as AddList).list, state);
    }
    case ListActionTypes.DELETE_LIST: {
      return ListAdapter.removeOne((action as DeleteList).listId, state);
    }
    default: return state;
  }
}

export { reducer as ListReducer };