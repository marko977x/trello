import { initialState, ChecklistState, ChecklistAdapter } from "./state";
import { Action } from '@ngrx/store';
import { ChecklistActionTypes, LoadChecklistsSuccess, LoadChecklistsError } from './actions';

function reducer(state = initialState, action: Action): ChecklistState {
  switch(action.type) {
    case ChecklistActionTypes.LOAD_CHECKLISTS: {
      return {
        ...state, loaded: false, error: null 
      }
    }
    case ChecklistActionTypes.LOAD_CHECKLISTS_SUCCESS: {
      return ChecklistAdapter.addAll((action as LoadChecklistsSuccess).checklists, {
        ...state, loaded: true, error: null
      })
    }
    case ChecklistActionTypes.LOAD_CHECKLISTS_ERROR: {
      return {
        ...state, loaded: false, error: (action as LoadChecklistsError).error
      }
    }
    default: return state;
  }
}

export { reducer as ChecklistReducer };