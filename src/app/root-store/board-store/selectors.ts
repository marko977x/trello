import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState, BoardAdapter } from './state';
import { Board } from 'src/app/models/board';
import { Ui } from 'src/app/models/ui';
import { Dictionary } from '@ngrx/entity';
import { isEmpty } from 'src/app/services/object-checker';
import { selectAllUserEntities } from '../user-store/selectors';
import { User } from 'src/app/models/user';
import { RootState } from '../root-state';

export const selectBoardState: MemoizedSelector<object, BoardState> = 
  createFeatureSelector<BoardState>('board');

export const selectAllBoards: (state: object) => 
  Board[] = BoardAdapter.getSelectors(selectBoardState).selectAll;

export const selectAllBoardEntities: (state: object) =>
Dictionary<Board> = BoardAdapter.getSelectors(selectBoardState).selectEntities;

export const selectBoardById = (id: string) => {
  return createSelector(
    selectAllBoards,
    (boards: Board[]) => {
      if(boards) return boards.find(board => board.id === id);
      else return null;
    }
  )
}

const selectUiState = (state: RootState) => state.ui;

export const selectLoggedUserBoards = () => {
  return createSelector(
    selectUiState,
    selectAllBoardEntities,
    selectAllUserEntities,
    (ui: Ui, boards: Dictionary<Board>, users: Dictionary<User>) => {
      if(isEmpty(ui) || isEmpty(boards) || isEmpty(users)) return null;

      if(ui.loggedUser == "") return null;
      const user: User = users[ui.loggedUser];
      
      return user.boards.map(boardId => boards[boardId]);
    }
  )
}

export const selectSelectedBoard = () => {
  return createSelector(
    selectUiState,
    selectAllBoardEntities,
    (ui: Ui, boards: Dictionary<Board>) => {
      if(isEmpty(ui)) return null;      
      return boards[ui.boardId];
    }
  )
}