import { initialState, ListState, ListAdapter } from './state';
import { Action } from '@ngrx/store';
import { ListActionTypes, LoadListsSuccess, AddListSuccess, DeleteListSuccess } from './actions';
import { CardActionTypes, DeleteCard, AddCard, DeleteCardSuccess, AddCardSuccess } from '../card-store/actions';
import { List } from 'src/app/models/list';
import { Update } from '@ngrx/entity';

function reducer(state = initialState, action: Action): ListState {
  switch(action.type) {
    case ListActionTypes.LOAD_LISTS_SUCCESS: {
      return ListAdapter.addAll((action as LoadListsSuccess).lists, {
        ...state, loaded: true, error: null
      })
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
    case CardActionTypes.ADD_CARD_SUCCESS: {
      const {card, listId} = (action as AddCardSuccess);
      const cardId: string = card.id;
      const update: Update<List> = {
        id: listId,
        changes: {cards: [...state.entities[listId].cards, cardId]}
      }
      return ListAdapter.updateOne(update, state);
    }
    case ListActionTypes.ADD_LIST_SUCCESS: {
      return ListAdapter.addOne((action as AddListSuccess).list, state);
    }
    case ListActionTypes.DELETE_LIST_SUCCESS: {
      return ListAdapter.removeOne((action as DeleteListSuccess).listId, state);
    }
    default: return state;
  }
}

export { reducer as ListReducer };