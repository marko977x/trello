import { Action } from '@ngrx/store';
import { List } from 'src/app/models/list';

export enum ListActionTypes {
  LOAD_LISTS = '[LIST] Load Lists',
  LOAD_LISTS_SUCCESS = '[LIST] Load Lists Success',
  LOAD_LISTS_ERROR = '[LIST] Load Lists Error',
  ADD_LIST = '[LIST] Add List',
  DELETE_LIST = '[LIST] Delete List'
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

export class AddList implements Action {
  readonly type = ListActionTypes.ADD_LIST;
  constructor(public boardId: string, public list: List) {}
}

export class DeleteList implements Action {
  readonly type = ListActionTypes.DELETE_LIST;
  constructor(public boardId: string, public listId: string) {}
}