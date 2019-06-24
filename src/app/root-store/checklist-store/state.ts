import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Checklist } from 'src/app/models/checklist';

const adapter: EntityAdapter<Checklist> = createEntityAdapter({
  selectId: model => model.id
});

export interface ChecklistState extends EntityState<Checklist> {};

export const initialState: ChecklistState = adapter.getInitialState({});

export { adapter as ChecklistAdapter }