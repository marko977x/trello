import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { List } from 'src/app/models/list';

const adapter: EntityAdapter<List> = createEntityAdapter({
  selectId: model => model.id
});

export interface ListState extends EntityState<List> {
  loaded: boolean;
  error: any;
};

export const initialState: ListState = adapter.getInitialState({
  loaded: false,
  error: null
});

export { adapter as ListAdapter }