import { Injectable } from '@angular/core';
import { FetchDataService, API_CARDS_URL } from 'src/app/services/fetch-data.service';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { CardActionTypes, LoadCardsSuccess } from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { Card } from 'src/app/models/card';

@Injectable()
export class CardStoreEffects {
  constructor(private dataService: FetchDataService, private actions$: Actions) {}

  @Effect()
  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(CardActionTypes.LOAD_CARDS),
    mergeMap(() => this.dataService.getAll<Card>(API_CARDS_URL).pipe(
      map(cards => new LoadCardsSuccess(cards))
    ))
  ));
}