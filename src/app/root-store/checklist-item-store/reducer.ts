import { initialState, ChecklistItemState, ChecklistItemAdapter } from './state';
import { Action } from '@ngrx/store';
import { ChecklistItemActionTypes, LoadChecklistItemsSuccess, LoadChecklistItemsError } from './actions';

function reducer(state = initialState, action: Action): ChecklistItemState {
  switch(action.type) {
    case ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS: {
      return {
        ...state, loaded: false, error: null 
      }
    }
    case ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS_SUCCESS: {
      return ChecklistItemAdapter.addAll((action as LoadChecklistItemsSuccess).checklistItems, {
        ...state, loaded: true, error: null
      })
    }
    case ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS_ERROR: {
      return {
        ...state, loaded: false, error: (action as LoadChecklistItemsError).error
      }
    }
    default: return state;
  }
}

export { reducer as ChecklistItemReducer };