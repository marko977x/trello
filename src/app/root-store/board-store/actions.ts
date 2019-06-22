import { Action } from '@ngrx/store';
import { Board } from 'src/app/models/board';

export enum BoardActionTypes {
  LOAD_BOARDS = '[BOARD] Load Boards',
  LOAD_BOARDS_SUCCESS = '[BOARD] Load Boards Success',
  LOAD_BOARDS_ERROR = '[BOARD] Load Boards Error',
  ADD_BOARD = '[BOARD] Add Board'
}

export class LoadBoards implements Action {
  readonly type = BoardActionTypes.LOAD_BOARDS;
}

export class LoadBoardsSuccess implements Action {
  readonly type = BoardActionTypes.LOAD_BOARDS_SUCCESS;
  constructor(public boards: Board[]) {}
}

export class LoadBoardsError implements Action {
  readonly type = BoardActionTypes.LOAD_BOARDS_ERROR;
  constructor(public error: any) {}
}

export class AddBoard implements Action {
  readonly type = BoardActionTypes.ADD_BOARD;
  constructor(public userId: string, public board: Board) {}
}
