import { ListState } from './list-store/state';
import { BoardState } from './board-store/state';

export interface RootState {
  list: ListState,
  board: BoardState
}
