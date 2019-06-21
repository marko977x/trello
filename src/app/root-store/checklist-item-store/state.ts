import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { ChecklistItem } from 'src/app/models/checklist-item';

const adapter: EntityAdapter<ChecklistItem> = createEntityAdapter({
  selectId: model => model.id
});

export interface ChecklistItemState extends EntityState<ChecklistItem> {
  loaded: boolean;
  error: any;
};

export const initialState: ChecklistItemState = adapter.getInitialState({
  loaded: false,
  error: null
});

export { adapter as ChecklistItemAdapter }