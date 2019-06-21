import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Card } from 'src/app/models/card';

const adapter: EntityAdapter<Card> = createEntityAdapter({
  selectId: model => model.id
});

export interface CardState extends EntityState<Card> {
  loaded: boolean;
  error: any;
};

export const initialState: CardState = adapter.getInitialState({
  loaded: false,
  error: null
});

export { adapter as CardAdapter }