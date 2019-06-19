import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { Board } from 'src/app/models/board';

const adapter: EntityAdapter<Board> = createEntityAdapter({
  selectId: model => model.id
});

export interface BoardState extends EntityState<Board> {
  loaded: boolean,
  error: any
};

export const initialState: BoardState = adapter.getInitialState({
  loaded: false,
  error: null
});

export { adapter as BoardAdapter };