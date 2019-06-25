import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActionTypes, LoadUserSuccess, SignUp, SignUpSuccess } from './actions';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/api-services/user.service';
import { SetLoggedUser } from '../ui-store/actions';
import { RepositoryService, API_USERS_URL } from 'src/app/services/api-services/repository.service';

@Injectable()
export class UserStoreEffects {
  constructor(
    private repository: RepositoryService,
    private actions$: Actions,
    private userService: UserService) {}

  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionTypes.LOAD_USERS),
    mergeMap(() => this.repository.getAll<User>(API_USERS_URL).pipe(
      map(users => new LoadUserSuccess(users))
    ))
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType<SignUp>(UserActionTypes.SIGN_UP),
    map(action => action.user),
    switchMap(user => this.userService.addUser(user).pipe(
      map(user => new SignUpSuccess(user))
    )),
  ));
}