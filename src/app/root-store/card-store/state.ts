import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Card } from 'src/app/models/card';

const adapter: EntityAdapter<Card> = createEntityAdapter({
  selectId: model => model.id
});

export interface CardState extends EntityState<Card> {};

export const initialState: CardState = adapter.getInitialState({});

export { adapter as CardAdapter }