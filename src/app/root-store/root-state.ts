import { ListState } from './list-store/state';
import { BoardState } from './board-store/state';
import { ChecklistState } from './checklist-store/state';
import { CardState } from './card-store/state';
import { ChecklistItemState } from './checklist-item-store/state';

export interface RootState {
  list: ListState,
  board: BoardState,
  card: CardState,
  checklist: ChecklistState,
  checklistItem: ChecklistItemState
}
