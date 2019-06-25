import { initialState, ChecklistItemState, ChecklistItemAdapter } from './state';
import { Action } from '@ngrx/store';
import { ChecklistItemActionTypes, LoadChecklistItemsSuccess, DeleteChecklistItem, SaveChecklistItemText, AddChecklistItem, ToggleChecklistItemSuccess, SaveChecklistItemTextSuccess, AddChecklistItemSuccess, AddChecklistItemError } from './actions';
import { Update } from '@ngrx/entity';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { ChecklistActionTypes, DeleteChecklistSuccess } from '../checklist-store/actions';

function reducer(state = initialState, action: Action): ChecklistItemState {
  switch(action.type) {
    case ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS_SUCCESS: {
      return ChecklistItemAdapter.addAll((action as LoadChecklistItemsSuccess).checklistItems, state)
    }
    case ChecklistItemActionTypes.TOGGLE_CHECKLIST_ITEM_SUCCESS: {
      const id: string = (action as ToggleChecklistItemSuccess).id;
      const update: Update<ChecklistItem> = {
        id, changes: { isChecked: !state.entities[id].isChecked }
      };
      return ChecklistItemAdapter.updateOne(update, state);
    }
    case ChecklistItemActionTypes.DELETE_CHECKLIST_ITEM_SUCCESS: {
      return ChecklistItemAdapter.removeOne((action as DeleteChecklistItem).itemId, state);
    }
    case ChecklistActionTypes.DELETE_CHECKLIST_SUCCESS: {
      const {checklistId} = (action as DeleteChecklistSuccess);
      let keys: string[] = new Array<string>();
      for(let key in state.entities) {
        if(state.entities[key].checklist === checklistId)
          keys.push(key);
      }
      return ChecklistItemAdapter.removeMany(keys, state);
    }
    case ChecklistItemActionTypes.SAVE_CHECKLIST_ITEM_TEXT: {
      const {itemId, text} = (action as SaveChecklistItemText);
      const update: Update<ChecklistItem> = {
        id: itemId,
        changes: {text}
      }
      return ChecklistItemAdapter.updateOne(update, state);
    }
    case ChecklistItemActionTypes.ADD_CHECKLIST_ITEM: {
      return ChecklistItemAdapter.addOne((action as AddChecklistItem).item, state);
    }
    case ChecklistItemActionTypes.ADD_CHECKLIST_ITEM_ERROR: {
      return ChecklistItemAdapter.removeOne((action as AddChecklistItemError).item.id, state);
    }
    default: return state;
  }
}

export { reducer as ChecklistItemReducer };