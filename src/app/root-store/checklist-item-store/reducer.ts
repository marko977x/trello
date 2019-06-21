import { initialState, ChecklistItemState, ChecklistItemAdapter } from './state';
import { Action } from '@ngrx/store';
import { ChecklistItemActionTypes, LoadChecklistItemsSuccess, LoadChecklistItemsError, ToggleChecklistItem, DeleteChecklistItem } from './actions';
import { Update } from '@ngrx/entity';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { ChecklistActionTypes, DeleteChecklist } from '../checklist-store/actions';

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
    case ChecklistItemActionTypes.TOGGLE_CHECKLIST_ITEM: {
      const id: string = (action as ToggleChecklistItem).id;
      const update: Update<ChecklistItem> = {
        id, changes: { isChecked: !state.entities[id].isChecked }
      };
      return ChecklistItemAdapter.updateOne(update, state);
    }
    case ChecklistItemActionTypes.DELETE_CHECKLIST_ITEM: {
      return ChecklistItemAdapter.removeOne((action as DeleteChecklistItem).itemId, state);
    }
    case ChecklistActionTypes.DELETE_CHECKLIST: {
      const {checklistId} = (action as DeleteChecklist);
      let keys: string[] = new Array<string>();
      for(let key in state.entities) {
        if(state.entities[key].checklist === checklistId)
          keys.push(key);
      }
      return ChecklistItemAdapter.removeMany(keys, state);
    }
    default: return state;
  }
}

export { reducer as ChecklistItemReducer };