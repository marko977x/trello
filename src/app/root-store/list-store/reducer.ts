import { initialState, ListState, ListAdapter } from './state';
import { Action } from '@ngrx/store';
import { ListActionTypes, LoadLists, LoadListsSuccess, LoadListsError } from './actions';

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
    default: return state;
  }
}

export { reducer as ListReducer };