import { Injectable } from '@angular/core';
import { FetchDataService, API_CHECKLISTS_URL } from 'src/app/services/fetch-data.service';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { ChecklistActionTypes, LoadChecklistsSuccess } from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { Checklist } from 'src/app/models/checklist';

@Injectable()
export class ChecklistStoreEffects {
  constructor(private dataService: FetchDataService, private actions$: Actions) {}

  @Effect()
  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistActionTypes.LOAD_CHECKLISTS),
    mergeMap(() => this.dataService.getAll<Checklist>(API_CHECKLISTS_URL).pipe(
      map(cards => new LoadChecklistsSuccess(cards))
    ))
  ));
}