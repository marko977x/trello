import { Action } from '@ngrx/store';
import { Board } from 'src/app/models/board';

export enum BoardActionTypes {
  LOAD_BOARDS = '[BOARD] Load Boards',
  LOAD_BOARDS_SUCCESS = '[BOARD] Load Boards Success',
  ADD_BOARD = '[BOARD] Add Board',
  ADD_BOARD_SUCCESS = '[BOARD] Add Board Success'
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