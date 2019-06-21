import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { ChecklistState, ChecklistAdapter } from './state';
import { Checklist } from 'src/app/models/checklist';
import { Dictionary } from '@ngrx/entity';

export const selectChecklistState: MemoizedSelector<object, ChecklistState> = 
  createFeatureSelector('checklist');

export const selectAllChecklists: (state: object) => 
  Checklist[] = ChecklistAdapter.getSelectors(selectChecklistState).selectAll;

export const selectAllChecklistEntities: (state: object) =>
  Dictionary<Checklist> = ChecklistAdapter.getSelectors(selectChecklistState).selectEntities;

export const selectChecklistById = (id: string) => {
  return createSelector(
    selectAllChecklists,
    (checklists: Checklist[]) => {
      if(checklists) return checklists.find(checklist => checklist.id === id);
      else return null;
    }
  )
}