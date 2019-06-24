import { Injectable } from '@angular/core';
import { API_CHECKLIST_ITEMS_URL } from 'src/app/services/api-services/repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChecklistItemActionTypes, LoadChecklistItemsSuccess, ToggleChecklistItem, ToggleChecklistItemSuccess } from './actions';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { RepositoryService } from 'src/app/services/api-services/repository.service';
import { ChecklistItemService } from 'src/app/services/api-services/checklist-item.service';
import { from } from 'rxjs';

@Injectable()
export class ChecklistItemStoreEffects {
  constructor(
    private repository: RepositoryService,
    private actions$: Actions,
    private checklistItemService: ChecklistItemService) {}

  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS),
    mergeMap(() => this.repository.getAll<ChecklistItem>(API_CHECKLIST_ITEMS_URL).pipe(
      map(items => new LoadChecklistItemsSuccess(items))
    ))
  ));

  toggleChecklistItem$ = createEffect(() => this.actions$.pipe(
    ofType<ToggleChecklistItem>(ChecklistItemActionTypes.TOGGLE_CHECKLIST_ITEM),
    mergeMap((action) => this.checklistItemService.toggleChecklistItem(action.id).pipe(
      map(checklistItem => new ToggleChecklistItemSuccess(checklistItem.id))
    ))
  ));
}