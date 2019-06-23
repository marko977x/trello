import { Injectable } from '@angular/core';
import { FetchDataService, API_USERS_URL } from 'src/app/services/fetch-data.service';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { UserActionTypes, LoadUserSuccess } from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable()
export class UserStoreEffects {
  constructor(private dataService: FetchDataService, private actions$: Actions) {}

  @Effect()
  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.LOAD_USERS),
    mergeMap(() => this.dataService.getAll<User>(API_USERS_URL).pipe(
      map(users => new LoadUserSuccess(users))
    ))
  ));

  @Effect()
  
}