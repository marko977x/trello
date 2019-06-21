import { Action } from '@ngrx/store';
import { Checklist } from 'src/app/models/checklist';

export enum ChecklistActionTypes {
  LOAD_CHECKLISTS = '[CHECKLIST] Load Checklists',
  LOAD_CHECKLISTS_SUCCESS = '[CHECKLIST] Load Checklists Success',
  LOAD_CHECKLISTS_ERROR = '[CHECKLIST] Load Checklists Error',
  DELETE_CHECKLIST = '[CHECKLIST] Delete Checklists',
  SWAP_ITEMS = '[CHECKLIST] Swap Items'
}

export class LoadChecklists implements Action {
  readonly type = ChecklistActionTypes.LOAD_CHECKLISTS;
}

export class LoadChecklistsSuccess implements Action {
  readonly type = ChecklistActionTypes.LOAD_CHECKLISTS_SUCCESS;
  constructor(public checklists: Checklist[]) {}
}

export class LoadChecklistsError implements Action {
  readonly type = ChecklistActionTypes.LOAD_CHECKLISTS_ERROR;
  constructor(public error: any) {}
}

export class DeleteChecklist implements Action {
  readonly type = ChecklistActionTypes.DELETE_CHECKLIST;
  constructor(public cardId: string, public checklistId: string) {}
}

export class SwapItems implements Action {
  readonly type = ChecklistActionTypes.SWAP_ITEMS;
  constructor(
    public checklistId: string, 
    public previousIndex: number,
    public currentIndex: number) {}
}