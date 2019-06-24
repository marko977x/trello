import { Action } from '@ngrx/store';
import { ChecklistItem } from 'src/app/models/checklist-item';

export enum ChecklistItemActionTypes {
  LOAD_CHECKLIST_ITEMS = '[CHECKLIST_ITEM] Load Checklist Items',
  LOAD_CHECKLIST_ITEMS_SUCCESS = '[CHECKLIST_ITEM] Load Checklist Items Success',
  TOGGLE_CHECKLIST_ITEM = '[CHECKLIST_ITEM] Toggle Checklist Item',
  TOGGLE_CHECKLIST_ITEM_SUCCESS = '[CHECKLIST_ITEM] Toggle Checklist Item Success',
  DELETE_CHECKLIST_ITEM = '[CHECKLIST_ITEM] Delete Checklist Item',
  DELETE_CHECKLIST_ITEM_SUCCESS = '[CHECKLIST_ITEM] Delete Checklist Item Success',
  SAVE_CHECKLIST_ITEM_TEXT = '[CHECKLIST_ITEM] Save Checklist Item Text',
  SAVE_CHECKLIST_ITEM_TEXT_SUCCESS = '[CHECKLIST_ITEM] Save Checklist Item Text Success',
  SAVE_CHECKLIST_ITEM_TEXT_ERROR = '[CHECKLIST_ITEM] Save Checklist Item Text Error',
  ADD_CHECKLIST_ITEM = '[CHECKLIST_ITEM] Add Checklist Item',
  ADD_CHECKLIST_ITEM_SUCCESS = '[CHECKLIST_ITEM] Add Checklist Item Success',
  ADD_CHECKLIST_ITEM_ERROR = '[CHECKLIST_ITEM] Add Checklist Item Error'
}

export class LoadChecklistItems implements Action {
  readonly type = ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS;
}

export class LoadChecklistItemsSuccess implements Action {
  readonly type = ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS_SUCCESS;
  constructor(public checklistItems: ChecklistItem[]) {}
}

export class ToggleChecklistItem implements Action {
  readonly type = ChecklistItemActionTypes.TOGGLE_CHECKLIST_ITEM;
  constructor(public id: string) {}
}

export class ToggleChecklistItemSuccess implements Action {
  readonly type = ChecklistItemActionTypes.TOGGLE_CHECKLIST_ITEM_SUCCESS;
  constructor(public id: string) {}
}

export class DeleteChecklistItem implements Action {
  readonly type = ChecklistItemActionTypes.DELETE_CHECKLIST_ITEM;
  constructor(public checklistId: string, public itemId: string) {}
}

export class DeleteChecklistItemSuccess implements Action {
  readonly type = ChecklistItemActionTypes.DELETE_CHECKLIST_ITEM_SUCCESS;
  constructor(public checklistId: string, public itemId: string) {}
}

export class SaveChecklistItemText implements Action {
  readonly type = ChecklistItemActionTypes.SAVE_CHECKLIST_ITEM_TEXT;
  constructor(public itemId: string, public text: string) {}
}

export class SaveChecklistItemTextSuccess implements Action {
  readonly type = ChecklistItemActionTypes.SAVE_CHECKLIST_ITEM_TEXT_SUCCESS;
  constructor(public itemId: string, public text: string) {}
}

export class SaveChecklistItemError implements Action {
  readonly type = ChecklistItemActionTypes.SAVE_CHECKLIST_ITEM_TEXT_ERROR;
  constructor(public itemId: string, public text: string) {}
}

export class AddChecklistItem implements Action {
  readonly type = ChecklistItemActionTypes.ADD_CHECKLIST_ITEM;
  constructor(public checklistId: string, public item: ChecklistItem) {}
}

export class AddChecklistItemSuccess implements Action {
  readonly type = ChecklistItemActionTypes.ADD_CHECKLIST_ITEM_SUCCESS;
  constructor(public checklistId: string, public item: ChecklistItem) {}
}

export class AddChecklistItemError implements Action {
  readonly type = ChecklistItemActionTypes.ADD_CHECKLIST_ITEM_ERROR;
  constructor(public checklistId: string, public item: ChecklistItem) {}
}