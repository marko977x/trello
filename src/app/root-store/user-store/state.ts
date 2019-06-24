import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from 'src/app/models/user';

const adapter: EntityAdapter<User> = createEntityAdapter({
  selectId: model => model.id
});

export interface UserState extends EntityState<User> {};

export const initialState: UserState = adapter.getInitialState({});

export { adapter as UserAdapter };