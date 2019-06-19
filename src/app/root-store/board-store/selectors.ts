import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState, BoardAdapter } from './state';
import { Board } from 'src/app/models/board';

export const selectBoardState: MemoizedSelector<object, BoardState> = 
  createFeatureSelector<BoardState>('board');

export const selectAllBoards: (state: object) => 
  Board[] = BoardAdapter.getSelectors(selectBoardState).selectAll;

export const selectBoardById = (id: string) => {
  return createSelector(
    selectAllBoards,
    (boards: Board[]) => {
      if(boards) return boards.find(board => board.id === id);
      else return null;
    }
  )
}