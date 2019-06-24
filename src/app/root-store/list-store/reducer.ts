import { initialState, ListState, ListAdapter } from './state';
import { Action } from '@ngrx/store';
import { ListActionTypes, LoadListsSuccess, DeleteListSuccess, AddListError, AddList } from './actions';
import { CardActionTypes, DeleteCardSuccess, AddCardSuccess, AddCard } from '../card-store/actions';
import { List } from 'src/app/models/list';
import { Update } from '@ngrx/entity';

function reducer(state = initialState, action: Action): ListState {
  switch(action.type) {
    case ListActionTypes.LOAD_LISTS_SUCCESS: {
      return ListAdapter.addAll((action as LoadListsSuccess).lists, state)
    }
    case CardActionTypes.DELETE_CARD_SUCCESS: {
      const {cardId, listId} = (action as DeleteCardSuccess);
      let cards: string[] = state.entities[listId].cards.filter(card => card !== cardId);
      const update: Update<List> = {
        id: listId,
        changes: {cards}
      }
      return ListAdapter.updateOne(update, state);
    }
    case CardActionTypes.ADD_CARD: {
      const {card, listId} = (action as AddCard);
      const update: Update<List> = {
        id: listId,
        changes: {cards: [...state.entities[listId].cards, card.id]}
      }
      return ListAdapter.updateOne(update, state);
    }
    case CardActionTypes.ADD_CARD_ERROR: {
      const {card, listId} = (action as AddCard);
      const cards: string[] = state.entities[listId].cards.filter(cardId => cardId !== card.id);
      const update: Update<List> = { id: listId, changes: {cards} }
      return ListAdapter.updateOne(update, state);
    }
    case ListActionTypes.ADD_LIST: {
      return ListAdapter.addOne((action as AddList).list, state);
    }
    case ListActionTypes.ADD_LIST_ERROR: {
      return ListAdapter.removeOne((action as AddListError).list.id, state);
    }
    case ListActionTypes.DELETE_LIST_SUCCESS: {
      return ListAdapter.removeOne((action as DeleteListSuccess).listId, state);
    }
    default: return state;
  }
}

export { reducer as ListReducer };