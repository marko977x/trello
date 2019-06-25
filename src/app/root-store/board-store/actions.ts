import { Action } from '@ngrx/store';
import { Board } from 'src/app/models/board';

export enum BoardActionTypes {
  LOAD_BOARDS = '[BOARD] Load Boards',
  LOAD_BOARDS_SUCCESS = '[BOARD] Load Boards Success',
  ADD_BOARD = '[BOARD] Add Board',
  ADD_BOARD_SUCCESS = '[BOARD] Add Board Success',
  SWAP_LISTS = '[BOARD] Swap Lists',
  SWAP_LISTS_ERROR = '[BOARD] Swap Lists Error',
  SWAP_LISTS_SUCCESS = '[BOARD] Swap Lists Success'
}

export class LoadBoards implements Action {
  readonly type = BoardActionTypes.LOAD_BOARDS;
}

export class LoadBoardsSuccess implements Action {
  readonly type = BoardActionTypes.LOAD_BOARDS_SUCCESS;
  constructor(public boards: Board[]) {}
}

export class AddBoard implements Action {
  readonly type = BoardActionTypes.ADD_BOARD;
  constructor(public userId: string, public board: Board) {}
}

export class AddBoardSuccess implements Action {
  readonly type = BoardActionTypes.ADD_BOARD_SUCCESS;
  constructor(public userId: string, public board: Board) {}
}

export class SwapLists implements Action {
  readonly type = BoardActionTypes.SWAP_LISTS;
  constructor(
    public boardId: string,
    public previousIndex: number,
    public currentIndex: number) {}
}

export class SwapListsError implements Action {
  readonly type = BoardActionTypes.SWAP_LISTS_ERROR;
  constructor(
    public boardId: string,
    public previousIndex: number,
    public currentIndex: number) {}
}

export class SwapListsSuccess implements Action {
  readonly type = BoardActionTypes.SWAP_LISTS_SUCCESS;
  constructor(
    public boardId: string,
    public previousIndex: number,
    public currentIndex: number) {}
}