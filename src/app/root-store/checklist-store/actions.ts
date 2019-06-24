import { Action } from '@ngrx/store';
import { Checklist } from 'src/app/models/checklist';

export enum ChecklistActionTypes {
  LOAD_CHECKLISTS = '[CHECKLIST] Load Checklists',
  LOAD_CHECKLISTS_SUCCESS = '[CHECKLIST] Load Checklists Success',
  DELETE_CHECKLIST = '[CHECKLIST] Delete Checklists',
  DELETE_CHECKLIST_SUCCESS = '[CHECKLIST] Delete Checklists Success',
  SWAP_ITEMS = '[CHECKLIST] Swap Items',
  ADD_CHECKLIST = '[CHECKLIST] Add Checklist',
  ADD_CHECKLIST_SUCCESS = '[CHECKLIST] Add Checklist Success'
}

export class LoadChecklists implements Action {
  readonly type = ChecklistActionTypes.LOAD_CHECKLISTS;
}

export class LoadChecklistsSuccess implements Action {
  readonly type = ChecklistActionTypes.LOAD_CHECKLISTS_SUCCESS;
  constructor(public checklists: Checklist[]) {}
}

export class DeleteChecklist implements Action {
  readonly type = ChecklistActionTypes.DELETE_CHECKLIST;
  constructor(public cardId: string, public checklistId: string) {}
}

export class DeleteChecklistSuccess implements Action {
  readonly type = ChecklistActionTypes.DELETE_CHECKLIST_SUCCESS;
  constructor(public cardId: string, public checklistId: string) {}
}

export class SwapItems implements Action {
  readonly type = ChecklistActionTypes.SWAP_ITEMS;
  constructor(
    public checklistId: string, 
    public previousIndex: number,
    public currentIndex: number) {}
}

export class AddChecklist implements Action {
  readonly type = ChecklistActionTypes.ADD_CHECKLIST;
  constructor(public cardId: string, public checklist: Checklist) {}
}

export class AddChecklistSuccess implements Action {
  readonly type = ChecklistActionTypes.ADD_CHECKLIST_SUCCESS;
  constructor(public cardId: string, public checklist: Checklist) {}
}