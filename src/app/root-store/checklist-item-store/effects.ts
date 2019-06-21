import { Injectable } from '@angular/core';
import { FetchDataService, API_CHECKLIST_ITEMS_URL } from 'src/app/services/fetch-data.service';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { ChecklistItemActionTypes, LoadChecklistItemsSuccess } from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { ChecklistItem } from 'src/app/models/checklist-item';

@Injectable()
export class ChecklistItemStoreEffects {
  constructor(private dataService: FetchDataService, private actions$: Actions) {}

  @Effect()
  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS),
    mergeMap(() => this.dataService.getAll<ChecklistItem>(API_CHECKLIST_ITEMS_URL).pipe(
      map(items => new LoadChecklistItemsSuccess(items))
    ))
  ));
}