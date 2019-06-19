import { Action } from '@ngrx/store';
import { List } from 'src/app/models/list';

export enum ListActionTypes {
  LOAD_LISTS = '[LIST] Load Lists',
  LOAD_LISTS_SUCCESS = '[LIST] Load Lists Success',
  LOAD_LISTS_ERROR = '[LIST] Load Lists Error'
}

export class LoadLists implements Action {
  readonly type = ListActionTypes.LOAD_LISTS;
}

export class LoadListsSuccess implements Action {
  readonly type = ListActionTypes.LOAD_LISTS_SUCCESS;
  constructor(public lists: List[]) {}
}

export class LoadListsError implements Action {
  readonly type = ListActionTypes.LOAD_LISTS_ERROR;
  constructor(public error: any) {}
}