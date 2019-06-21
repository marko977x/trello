import { Action } from '@ngrx/store';
import { UserState, UserAdapter, initialState } from './state';
import { UserActionTypes, LoadUserSuccess, LoadUsersError } from './actions';

function reducer(state = initialState, action: Action): UserState {
  switch(action.type) {
    case UserActionTypes.LOAD_USERS: {
      return {
        ...state, loaded: false, error: null 
      }
    }
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      return UserAdapter.addAll((action as LoadUserSuccess).users, {
        ...state, loaded: true, error: null
      });
    }
    case UserActionTypes.LOAD_USERS_ERROR: {
      return {
        ...state, loaded: false, error: (action as LoadUsersError).error
      }
    }
    default: return state;
  }
}

export { reducer as UserReducer };