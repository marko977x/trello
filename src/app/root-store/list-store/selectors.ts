import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { ListState, ListAdapter } from './state';
import { List } from 'src/app/models/list';

export const selectListState: MemoizedSelector<object, ListState> = 
  createFeatureSelector('list');

export const selectAllLists: (state: object) => 
  List[] = ListAdapter.getSelectors(selectListState).selectAll;

export const selectListById = (id: string) => {
  return createSelector(
    selectAllLists,
    (lists: List[]) => {
      if(lists) return lists.find(list => list.id === id);
      else return null;
    }
  )
}