import { Ui } from 'src/app/models/ui';
import { RootState } from '../root-state';
import { createSelector } from '@ngrx/store';
import { isEmpty } from 'src/app/services/object-checker';

export const selectUiState = (state: RootState) => state.ui;

export const selectSelectedBoard = () => {
  return createSelector(
    selectUiState,
    (ui: Ui) => {
      if(isEmpty(ui)) return null;      
      return ui.board;
    }
  )
}