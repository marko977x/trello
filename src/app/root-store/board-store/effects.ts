import { Injectable } from '@angular/core';
import { API_BOARDS_URL } from 'src/app/services/api-services/repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from "rxjs/operators";
import { BoardActionTypes, LoadBoardsSuccess, AddBoard, AddBoardSuccess, SwapLists, SwapListsSuccess, SwapListsError } from './actions';
import { Board } from 'src/app/models/board';
import { RepositoryService } from 'src/app/services/api-services/repository.service';
import { BoardService } from 'src/app/services/api-services/board.service';
import { of } from 'rxjs';

@Injectable()
export class BoardStoreEffects {
  constructor(
    private repository: RepositoryService,
    private actions$: Actions,
    private boardService: BoardService) {}

  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActionTypes.LOAD_BOARDS),
    mergeMap(() => this.repository.getAll<Board>(API_BOARDS_URL).pipe(
      map(boards => new LoadBoardsSuccess(boards))
    ))
  ));

  addBoard$ = createEffect(() => this.actions$.pipe(
    ofType<AddBoard>(BoardActionTypes.ADD_BOARD),
    mergeMap((action) => this.boardService.addBoard(action).pipe(
      map(() => new AddBoardSuccess(action.userId, action.board))
    ))
  ));

  swapLists$ = createEffect(() => this.actions$.pipe(
    ofType<SwapLists>(BoardActionTypes.SWAP_LISTS),
    mergeMap((action) => this.boardService.swapLists(action).pipe(
      map(() => new SwapListsSuccess(action.boardId, action.previousIndex, action.currentIndex)),
      catchError(() => of(new SwapListsError(action.boardId, action.previousIndex, action.currentIndex)))
    ))
  ));
}