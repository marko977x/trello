import { Injectable } from "@angular/core";
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { Actions, Effect, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs/operators";
import { ListActionTypes, LoadListsSuccess } from './actions';

@Injectable()
export class ListStoreEffects {
  constructor(private dataService: FetchDataService, private actions$: Actions) {}

  @Effect()
  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(ListActionTypes.LOAD_LISTS),
    mergeMap(() => this.dataService.getAllLists().pipe(
      map(lists => new LoadListsSuccess(lists))
    ))
  ));
}