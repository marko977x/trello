import { initialState, ChecklistState, ChecklistAdapter } from "./state";
import { Action } from '@ngrx/store';
import { ChecklistActionTypes, LoadChecklistsSuccess, DeleteChecklistSuccess, AddChecklistSuccess, SwapItems, DeleteChecklist } from './actions';
import { ChecklistItemActionTypes, DeleteChecklistItem, AddChecklistItem, DeleteChecklistItemSuccess } from '../checklist-item-store/actions';
import { Update } from '@ngrx/entity';
import { Checklist } from 'src/app/models/checklist';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ListActionTypes, DeleteListSuccess } from '../list-store/actions';

function reducer(state = initialState, action: Action): ChecklistState {
  switch(action.type) {
    case ChecklistActionTypes.LOAD_CHECKLISTS_SUCCESS: {
      return ChecklistAdapter.addAll((action as LoadChecklistsSuccess).checklists, {
        ...state, loaded: true, error: null
      })
    }
    case ChecklistItemActionTypes.DELETE_CHECKLIST_ITEM_SUCCESS: {
      const {checklistId, itemId} = (action as DeleteChecklistItemSuccess);
      const items: string[] = state.entities[checklistId].items.filter(item => item !== itemId);
      const update: Update<Checklist> = {
        id: checklistId,
        changes: { items }
      }
      return ChecklistAdapter.updateOne(update, state);
    }
    case ChecklistActionTypes.DELETE_CHECKLIST_SUCCESS: {
      return ChecklistAdapter.removeOne((action as DeleteChecklistSuccess).checklistId, state);
    }
    case ChecklistActionTypes.SWAP_ITEMS: {
      const {checklistId, previousIndex, currentIndex} = (action as SwapItems);
      let checklist: Checklist = state.entities[checklistId];
      moveItemInArray(checklist.items, previousIndex, currentIndex);
      return {
        ...state, entities: {
          ...state.entities,
          [checklistId]: {
            ...state.entities[checklistId],
            items: checklist.items
          }
        }
      }
    }
    case ChecklistItemActionTypes.ADD_CHECKLIST_ITEM: {
      const {checklistId, item} = (action as AddChecklistItem);
      const itemId: string = item.id;
      const update: Update<Checklist> = {
        id: checklistId,
        changes: {items: [...state.entities[checklistId].items, itemId]}
      }
      return ChecklistAdapter.updateOne(update, state);
    }
    case ChecklistItemActionTypes.ADD_CHECKLIST_ITEM_ERROR: {
      const {checklistId, item} = (action as AddChecklistItem);
      const items: string[] = state.entities[checklistId].items.filter(itemId => itemId !== item.id);
      const update: Update<Checklist> = { id: checklistId, changes: {items} }
      return ChecklistAdapter.updateOne(update, state);
    }
    case ChecklistActionTypes.ADD_CHECKLIST_SUCCESS: {
      return ChecklistAdapter.addOne((action as AddChecklistSuccess).checklist, state);
    }
    case ListActionTypes.DELETE_LIST_SUCCESS: {
      const {listId} = (action as DeleteListSuccess);
      const checklists: string[] = [];
      for(let key in state.entities) {
        if(state.entities[key].list === listId) checklists.push(key);
      }
      return ChecklistAdapter.removeMany(checklists, state);
    }
    default: return state;
  }
}

export { reducer as ChecklistReducer };