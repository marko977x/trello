import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum UserActionTypes {
  LOAD_USERS = '[USER] Load Users',
  LOAD_USERS_SUCCESS = '[USER] Load Users Success',
  SIGN_UP = '[User] Sign Up',
  SIGN_UP_SUCCESS = '[User] Sign Up Success'
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LOAD_USERS;
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
  constructor(public users: User[]) {}
}

export class SignUp implements Action {
  readonly type = UserActionTypes.SIGN_UP;
  constructor(public user: User) {}
}

export class SignUpSuccess implements Action {
  readonly type = UserActionTypes.SIGN_UP_SUCCESS;
  constructor(public user: User) {}
}