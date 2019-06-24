import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs/operators";
import { ListActionTypes, LoadListsSuccess, AddList, AddListSuccess, DeleteList, DeleteListSuccess } from './actions';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/api-services/list.service';
import { from } from 'rxjs';
import { RepositoryService, API_LISTS_URL } from 'src/app/services/api-services/repository.service';

@Injectable()
export class ListStoreEffects {
  constructor(
    private repository: RepositoryService,
    private actions$: Actions,
    private listService: ListService) {}

  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(ListActionTypes.LOAD_LISTS),
    mergeMap(() => this.repository.getAll<List>(API_LISTS_URL).pipe(
      map(lists => new LoadListsSuccess(lists))
    ))
  ));
  
  addList$ = createEffect(() => this.actions$.pipe(
    ofType<AddList>(ListActionTypes.ADD_LIST), 
    mergeMap((action) => this.listService.addList(action).pipe(
      map(() => new AddListSuccess(action.boardId, action.list))
    ))
  ));

  deleteList$ = createEffect(() => this.actions$.pipe(
    ofType<DeleteList>(ListActionTypes.DELETE_LIST),
    mergeMap((action) => this.listService.deleteList(action).pipe(
      map(() => new DeleteListSuccess(action.boardId, action.listId))
    ))
  ));
}