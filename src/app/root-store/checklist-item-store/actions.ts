import { Action } from '@ngrx/store';
import { ChecklistItem } from 'src/app/models/checklist-item';

export enum ChecklistItemActionTypes {
  LOAD_CHECKLIST_ITEMS = '[CHECKLIST_ITEM] Load Checklist Items',
  LOAD_CHECKLIST_ITEMS_SUCCESS = '[CHECKLIST_ITEM] Load Checklist Items Success',
  LOAD_CHECKLIST_ITEMS_ERROR = '[CHECKLIST_ITEM] Load Checklist Items Error',
  TOGGLE_CHECKLIST_ITEM = '[CHECKLIST_ITEM] Toggle Checklist Item',
  DELETE_CHECKLIST_ITEM = '[CHECKLIST_ITEM] Delete Checklist Item'
}

export class LoadChecklistItems implements Action {
  readonly type = ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS;
}

export class LoadChecklistItemsSuccess implements Action {
  readonly type = ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS_SUCCESS;
  constructor(public checklistItems: ChecklistItem[]) {}
}

export class LoadChecklistItemsError implements Action {
  readonly type = ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS_ERROR;
  constructor(public error: any) {}
}

export class ToggleChecklistItem implements Action {
  readonly type = ChecklistItemActionTypes.TOGGLE_CHECKLIST_ITEM;
  constructor(public id: string) {}
}

export class DeleteChecklistItem implements Action {
  readonly type = ChecklistItemActionTypes.DELETE_CHECKLIST_ITEM;
  constructor(public checklistId: string, public itemId: string) {}
}