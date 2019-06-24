import { Injectable } from '@angular/core';
import { API_CHECKLIST_ITEMS_URL } from 'src/app/services/api-services/repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChecklistItemActionTypes, LoadChecklistItemsSuccess, ToggleChecklistItem, ToggleChecklistItemSuccess, AddChecklistItem, AddChecklistItemSuccess, AddChecklistItemError, SaveChecklistItemText, DeleteChecklistItem, DeleteChecklistItemSuccess } from './actions';
import { mergeMap, map, switchMap, catchError, tap } from 'rxjs/operators';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { RepositoryService } from 'src/app/services/api-services/repository.service';
import { ChecklistItemService } from 'src/app/services/api-services/checklist-item.service';
import { from, of } from 'rxjs';

@Injectable()
export class ChecklistItemStoreEffects {
  constructor(
    private repository: RepositoryService,
    private actions$: Actions,
    private checklistItemService: ChecklistItemService) {}

  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistItemActionTypes.LOAD_CHECKLIST_ITEMS),
    mergeMap(() => this.repository.getAll<ChecklistItem>(API_CHECKLIST_ITEMS_URL).pipe(
      map(items => new LoadChecklistItemsSuccess(items))
    ))
  ));

  toggleChecklistItem$ = createEffect(() => this.actions$.pipe(
    ofType<ToggleChecklistItem>(ChecklistItemActionTypes.TOGGLE_CHECKLIST_ITEM),
    mergeMap((action) => this.checklistItemService.toggleChecklistItem(action.id).pipe(
      map(checklistItem => new ToggleChecklistItemSuccess(checklistItem.id))
    ))
  ));

  addChecklistItem$ = createEffect(() => this.actions$.pipe(
    ofType<AddChecklistItem>(ChecklistItemActionTypes.ADD_CHECKLIST_ITEM),
    mergeMap((action) => this.checklistItemService.addChecklistItem(action).pipe(
      map(() => new AddChecklistItemSuccess(action.checklistId, action.item)),
      catchError(() => of(new AddChecklistItemError(action.checklistId, action.item)))
    ))
  ))

  changeChecklistItemText = createEffect(() => this.actions$.pipe(
    ofType<SaveChecklistItemText>(ChecklistItemActionTypes.SAVE_CHECKLIST_ITEM_TEXT),
    tap((action) => this.checklistItemService.changeChecklistItemText(action).subscribe())
  ), {dispatch: false})

  deleteChecklistItem = createEffect(() => this.actions$.pipe(
    ofType<DeleteChecklistItem>(ChecklistItemActionTypes.DELETE_CHECKLIST_ITEM),
    mergeMap(action => this.checklistItemService.deleteChecklistItem(action).pipe(
      map(() => new DeleteChecklistItemSuccess(action.checklistId, action.itemId))
    ))
  ))
}