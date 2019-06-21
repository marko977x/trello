import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Checklist } from 'src/app/models/checklist';

const adapter: EntityAdapter<Checklist> = createEntityAdapter({
  selectId: model => model.id
});

export interface ChecklistState extends EntityState<Checklist> {
  loaded: boolean;
  error: any;
};

export const initialState: ChecklistState = adapter.getInitialState({
  loaded: false,
  error: null
});

export { adapter as ChecklistAdapter }