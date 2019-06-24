import { Injectable } from '@angular/core';
import { API_CHECKLISTS_URL } from 'src/app/services/api-services/repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChecklistActionTypes, LoadChecklistsSuccess, AddChecklist, AddChecklistSuccess, SwapItems, DeleteChecklist, DeleteChecklistSuccess } from './actions';
import { mergeMap, map, tap } from 'rxjs/operators';
import { Checklist } from 'src/app/models/checklist';
import { ChecklistService } from 'src/app/services/api-services/checklist.service';
import { from } from 'rxjs';
import { RepositoryService } from 'src/app/services/api-services/repository.service';

@Injectable()
export class ChecklistStoreEffects {
  constructor(
    private repository: RepositoryService,
    private actions$: Actions,
    private checklistService: ChecklistService) {}

  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistActionTypes.LOAD_CHECKLISTS),
    mergeMap(() => this.repository.getAll<Checklist>(API_CHECKLISTS_URL).pipe(
      map(cards => new LoadChecklistsSuccess(cards))
    ))
  ));

  addChecklist$ = createEffect(() => this.actions$.pipe(
    ofType<AddChecklist>(ChecklistActionTypes.ADD_CHECKLIST),
    mergeMap((action) => this.checklistService.addChecklist(action).pipe(
      map(() => new AddChecklistSuccess(action.cardId, action.checklist))
    ))
  ));

  swapItems$ = createEffect(() => this.actions$.pipe(
    ofType<SwapItems>(ChecklistActionTypes.SWAP_ITEMS),
    tap(action => this.checklistService.swapItems(action).subscribe())
  ), {dispatch: false});

  deleteChecklist$ = createEffect(() => this.actions$.pipe(
    ofType<DeleteChecklist>(ChecklistActionTypes.DELETE_CHECKLIST),
    mergeMap((action) => this.checklistService.deleteChecklist(action).pipe(
      map(() => new DeleteChecklistSuccess(action.cardId, action.checklistId))
    ))
  ));

}