import { UserState, UserAdapter } from './state';
import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { Dictionary } from '@ngrx/entity';

export const selectUserState: MemoizedSelector<object, UserState> = 
  createFeatureSelector<UserState>('user');

export const selectAllUsers: (state: object) => 
  User[] = UserAdapter.getSelectors(selectUserState).selectAll;

export const selectAllUserEntities: (state: object) =>
Dictionary<User> = UserAdapter.getSelectors(selectUserState).selectEntities;

export const selectUserById = (id: string) => {
  return createSelector(
    selectAllUsers,
    (users: User[]) => {
      if(users) return users.find(user => user.id === id);
      else return null;
    }
  )
}