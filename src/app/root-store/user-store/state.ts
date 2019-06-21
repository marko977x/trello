import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from 'src/app/models/user';

const adapter: EntityAdapter<User> = createEntityAdapter({
  selectId: model => model.id
});

export interface UserState extends EntityState<User> {
  loaded: boolean,
  error: any
};

export const initialState: UserState = adapter.getInitialState({
  loaded: false,
  error: null
});

export { adapter as UserAdapter };