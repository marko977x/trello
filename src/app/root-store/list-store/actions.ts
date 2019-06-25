import { Action } from '@ngrx/store';
import { List } from 'src/app/models/list';

export enum ListActionTypes {
  LOAD_LISTS = '[LIST] Load Lists',
  LOAD_LISTS_SUCCESS = '[LIST] Load Lists Success',
  ADD_LIST = '[LIST] Add List',
  ADD_LIST_SUCCESS = '[LIST] Add List Success',
  ADD_LIST_ERROR = '[LIST] Add List Error',
  DELETE_LIST = '[LIST] Delete List',
  DELETE_LIST_SUCCESS = '[LIST] Delete List Success',
  SWAP_CARDS = '[LIST] Swap Cards',
  SWAP_CARDS_SUCCESS = '[LIST] Swap Cards Success',
  SWAP_CARDS_ERROR = '[LIST] Swap Cards Error'
}

export class LoadLists implements Action {
  readonly type = ListActionTypes.LOAD_LISTS;
}

export class LoadListsSuccess implements Action {
  readonly type = ListActionTypes.LOAD_LISTS_SUCCESS;
  constructor(public lists: List[]) {}
}

export class AddList implements Action {
  readonly type = ListActionTypes.ADD_LIST;
  constructor(public boardId: string, public list: List) {}
}

export class AddListSuccess implements Action {
  readonly type = ListActionTypes.ADD_LIST_SUCCESS;
  constructor(public boardId: string, public list: List) {}
}

export class AddListError implements Action {
  readonly type = ListActionTypes.ADD_LIST_ERROR;
  constructor(public boardId: string, public list: List) {}
}

export class DeleteList implements Action {
  readonly type = ListActionTypes.DELETE_LIST;
  constructor(public boardId: string, public listId: string) {}
}

export class DeleteListSuccess implements Action {
  readonly type = ListActionTypes.DELETE_LIST_SUCCESS;
  constructor(public boardId: string, public listId: string) {}
}

export class SwapCards implements Action {
  readonly type = ListActionTypes.SWAP_CARDS;
  constructor(
    public listId: string,
    public previousIndex: number,
    public currentIndex: number) {}
}

export class SwapCardsSuccess implements Action {
  readonly type = ListActionTypes.SWAP_CARDS_SUCCESS;
  constructor(
    public listId: string,
    public previousIndex: number,
    public currentIndex: number) {}
}

export class SwapCardsError implements Action {
  readonly type = ListActionTypes.SWAP_CARDS_ERROR;
  constructor(
    public listId: string,
    public previousIndex: number,
    public currentIndex: number) {}
}