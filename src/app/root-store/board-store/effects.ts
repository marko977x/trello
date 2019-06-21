import { Injectable } from '@angular/core';
import { FetchDataService, API_BOARDS_URL } from 'src/app/services/fetch-data.service';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from "rxjs/operators";
import { BoardActionTypes, LoadBoardsSuccess } from './actions';
import { Board } from 'src/app/models/board';

@Injectable()
export class BoardStoreEffects {
  constructor(private dataService: FetchDataService, private actions$: Actions) {}

  @Effect()
  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActionTypes.LOAD_BOARDS),
    mergeMap(() => this.dataService.getAll<Board>(API_BOARDS_URL).pipe(
      map(boards => new LoadBoardsSuccess(boards))
    ))
  ));
}