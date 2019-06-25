import { initialState, BoardState, BoardAdapter } from './state';
import { Action } from '@ngrx/store';
import { BoardActionTypes, LoadBoardsSuccess, AddBoard, SwapLists, SwapListsError } from './actions';
import { ListActionTypes, AddListSuccess, DeleteListSuccess, AddListError, AddList } from '../list-store/actions';
import { Board } from 'src/app/models/board';
import { Update } from '@ngrx/entity';
import { moveItemInArray } from '@angular/cdk/drag-drop';

function reducer(state = initialState, action: Action): BoardState {
  switch(action.type) {
    case BoardActionTypes.LOAD_BOARDS_SUCCESS: {
      return BoardAdapter.addAll((action as LoadBoardsSuccess).boards, state);
    }
    case BoardActionTypes.ADD_BOARD_SUCCESS: {
      return BoardAdapter.addOne((action as AddBoard).board, state);
    }
    case ListActionTypes.ADD_LIST: {
      const {boardId, list} = (action as AddList);
      const update: Update<Board> = {
        id: boardId,
        changes: {lists: [...state.entities[boardId].lists, list.id]}
      }
      return BoardAdapter.updateOne(update, state);
    }
    case ListActionTypes.ADD_LIST_ERROR: {
      const {boardId, list} = (action as AddListError);
      const lists: string[] = state.entities[boardId].lists.filter(listId => listId !== list.id);
      const update: Update<Board> = { id: boardId, changes: {lists} }
      return BoardAdapter.updateOne(update, state);
    }
    case ListActionTypes.DELETE_LIST_SUCCESS: {
      const {boardId, listId} = (action as DeleteListSuccess);
      let lists: string[] = state.entities[boardId].lists.filter(list => list !== listId);
      const update: Update<Board> = {
        id: boardId,
        changes: {lists}
      }
      return BoardAdapter.updateOne(update, state);
    }
    case BoardActionTypes.SWAP_LISTS: {
      const {currentIndex, previousIndex, boardId} = (action as SwapLists);
      const lists: string[] = state.entities[boardId].lists;
      moveItemInArray(lists, previousIndex, currentIndex);
      return {...state, entities: {
        ...state.entities,
          [boardId]: {
            ...state.entities[boardId],
            lists
          }
        }
      }
    }
    case BoardActionTypes.SWAP_LISTS_ERROR: {
      const {currentIndex, previousIndex, boardId} = (action as SwapListsError);
      const lists: string[] = state.entities[boardId].lists;
      moveItemInArray(lists, currentIndex, previousIndex);
      return {...state, entities: {
        ...state.entities,
          [boardId]: {
            ...state.entities[boardId],
            lists
          }
        }
      }
    }
    default: return state;
  }
}

export { reducer as BoardReducer };