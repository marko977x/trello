import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { List } from 'src/app/models/list';

const adapter: EntityAdapter<List> = createEntityAdapter({
  selectId: model => model.id
});

export interface ListState extends EntityState<List> {};

export const initialState: ListState = adapter.getInitialState({});

export { adapter as ListAdapter }