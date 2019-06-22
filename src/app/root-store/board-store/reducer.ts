import { initialState, BoardState, BoardAdapter } from './state';
import { Action } from '@ngrx/store';
import { BoardActionTypes, LoadBoardsSuccess, LoadBoardsError, AddBoard } from './actions';
import { ListActionTypes, AddList, DeleteList } from '../list-store/actions';
import { Board } from 'src/app/models/board';
import { Update } from '@ngrx/entity';

function reducer(state = initialState, action: Action): BoardState {
  switch(action.type) {
    case BoardActionTypes.LOAD_BOARDS: {
      return {
        ...state, loaded: false, error: null 
      }
    }
    case BoardActionTypes.LOAD_BOARDS_SUCCESS: {
      return BoardAdapter.addAll((action as LoadBoardsSuccess).boards, {
        ...state, loaded: true, error: null
      });
    }
    case BoardActionTypes.LOAD_BOARDS_ERROR: {
      return {
        ...state, loaded: false, error: (action as LoadBoardsError).error
      }
    }
    case BoardActionTypes.ADD_BOARD: {
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
    case ListActionTypes.DELETE_LIST: {
      const {boardId, listId} = (action as DeleteList);
      console.log(listId);
      let lists: string[] = state.entities[boardId].lists.filter(list => list !== listId);
      const update: Update<Board> = {
        id: boardId,
        changes: {lists}
      }
      return BoardAdapter.updateOne(update, state);
    }
    default: return state;
  }
}

export { reducer as BoardReducer };