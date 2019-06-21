import { Action } from '@ngrx/store';
import { ChecklistItem } from 'src/app/models/checklist-item';

export enum ChecklistItemActionTypes {
  LOAD_CHECKLIST_ITEMS = '[CHECKLIST_ITEM] Load Checklist Items',
  LOAD_CHECKLIST_ITEMS_SUCCESS = '[CHECKLIST_ITEM] Load Checklist Items Success',
  LOAD_CHECKLIST_ITEMS_ERROR = '[CHECKLIST_ITEM] Load Checklist Items Error'
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