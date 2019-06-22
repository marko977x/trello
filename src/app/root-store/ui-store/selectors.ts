import { Ui } from 'src/app/models/ui';
import { RootState } from '../root-state';
import { createSelector } from '@ngrx/store';
import { isEmpty } from 'src/app/services/object-checker';
import { selectAllBoardEntities } from '../board-store/selectors';
import { Dictionary } from '@ngrx/entity';
import { Board } from 'src/app/models/board';

export const selectUiState = (state: RootState) => state.ui;

// export const selectSelectedBoard = () => {
//   return createSelector(
//     selectUiState,
//     selectAllBoardEntities,
//     (ui: Ui, boards: Dictionary<Board>) => {
//       if(isEmpty(ui)) return null;      
//       return boards[ui.boardId];
//     }
//   )
// }