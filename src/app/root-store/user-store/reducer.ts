import { Action } from '@ngrx/store';
import { UserState, UserAdapter, initialState } from './state';
import { UserActionTypes, LoadUserSuccess, SignUp, SignUpSuccess } from './actions';
import { BoardActionTypes, AddBoard } from '../board-store/actions';
import { User } from 'src/app/models/user';
import { Update } from '@ngrx/entity';

function reducer(state = initialState, action: Action): UserState {
  switch(action.type) {
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      return UserAdapter.addAll((action as LoadUserSuccess).users, {
        ...state, loaded: true, error: null
      });
    }
    case BoardActionTypes.ADD_BOARD_SUCCESS: {
      const {userId, board} = (action as AddBoard);
      const update: Update<User> = {
        id: userId,
        changes: {boards: [...state.entities[userId].boards, board.id]}
      }
      return UserAdapter.updateOne(update, state);
    }
    case UserActionTypes.SIGN_UP_SUCCESS: {
      return UserAdapter.addOne((action as SignUpSuccess).user, state);
    }
    default: return state;
  }
}

export { reducer as UserReducer };