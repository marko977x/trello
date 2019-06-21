import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum UserActionTypes {
  LOAD_USERS = '[USER] Load Users',
  LOAD_USERS_SUCCESS = '[USER] Load Users Success',
  LOAD_USERS_ERROR = '[USER] Load Users Error',
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LOAD_USERS;
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
  constructor(public users: User[]) {}
}

export class LoadUsersError implements Action {
  readonly type = UserActionTypes.LOAD_USERS_ERROR;
  constructor(public error: any) {}
}