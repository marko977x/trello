import { initialState, ChecklistState, ChecklistAdapter } from "./state";
import { Action } from '@ngrx/store';
import { ChecklistActionTypes, LoadChecklistsSuccess, LoadChecklistsError, DeleteChecklist } from './actions';
import { ChecklistItemActionTypes, DeleteChecklistItem } from '../checklist-item-store/actions';
import { Update } from '@ngrx/entity';
import { Checklist } from 'src/app/models/checklist';

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
    case ChecklistItemActionTypes.DELETE_CHECKLIST_ITEM: {
      const {checklistId, itemId} = (action as DeleteChecklistItem);
      const items: string[] = state.entities[checklistId].items.filter(item => item !== itemId);
      const update: Update<Checklist> = {
        id: checklistId,
        changes: { items }
      }
      return ChecklistAdapter.updateOne(update, state);
    }
    case ChecklistActionTypes.DELETE_CHECKLIST: {
      return ChecklistAdapter.removeOne((action as DeleteChecklist).checklistId, state);
    }
    default: return state;
  }
}

export { reducer as ChecklistReducer };