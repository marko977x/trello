import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { ChecklistItemState, ChecklistItemAdapter } from './state';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { selectAllCardEntities } from '../card-store/selectors';
import { selectAllChecklistEntities } from '../checklist-store/selectors';
import { Dictionary } from '@ngrx/entity';
import { Checklist } from 'src/app/models/checklist';
import { Card } from 'src/app/models/card';
import { isEmpty } from 'src/app/services/objectChecker';

export const selectChecklistItemState: MemoizedSelector<object, ChecklistItemState> = 
  createFeatureSelector('checklistItem');

export const selectAllChecklistItems: (state: object) => 
  ChecklistItem[] = ChecklistItemAdapter.getSelectors(selectChecklistItemState).selectAll;

export const selectAllChecklistItemEntites: (state: object) =>
  Dictionary<ChecklistItem> = ChecklistItemAdapter.getSelectors(selectChecklistItemState).selectEntities;

export const selectChecklistItemById = (id: string) => {
  return createSelector(
    selectAllChecklistItems,
    (checklistItems: ChecklistItem[]) => {
      if(checklistItems) return checklistItems.find(item => item.id === id);
      else return null;
    }
  )
}

export const selectCardChecklistsItems = (cardId: string) => {
  return createSelector(
    selectAllChecklistEntities,
    selectAllCardEntities,
    selectAllChecklistItemEntites,
    (checklists: Dictionary<Checklist>,
      cards: Dictionary<Card>,
      checklistItems: Dictionary<ChecklistItem>) => {
        if(isEmpty(cards) || isEmpty(checklists) || isEmpty(checklistItems)) return null;
        
        let card: Card = cards[cardId];
        if(!card || card.checklists.length == 0) return null;

        let result: ChecklistItem[] = new Array<ChecklistItem>();
        card.checklists.forEach(checklist => {
          result.push(...checklists[checklist].items.map(item => checklistItems[item]));
        });
        return result;
    }
  )
}

export const selectChecklistItems = (checklistId: string) => {
  return createSelector(
    selectAllChecklistEntities,
    selectAllChecklistItemEntites,
    (checklists: Dictionary<Checklist>, checklistItems: Dictionary<ChecklistItem>) => {
      if(isEmpty(checklists) || isEmpty(checklistItems)) return null;

      let checklist: Checklist = checklists[checklistId];
      if(!checklist) return null;

      return checklist.items.map(item => checklistItems[item]);
    }
  )
}