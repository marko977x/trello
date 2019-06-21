import { Action } from '@ngrx/store';
import { Checklist } from 'src/app/models/checklist';

export enum ChecklistActionTypes {
  LOAD_CHECKLISTS = '[CHECKLIST] Load Checklists',
  LOAD_CHECKLISTS_SUCCESS = '[CHECKLIST] Load Checklists Success',
  LOAD_CHECKLISTS_ERROR = '[CHECKLIST] Load Checklists Error'
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