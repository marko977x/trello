import { Injectable } from '@angular/core';
import { API_CARDS_URL } from 'src/app/services/api-services/repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CardActionTypes, LoadCardsSuccess, AddCard, AddCardSuccess, DeleteCard, DeleteCardSuccess, SaveDescription, ChangeCardTitle } from './actions';
import { mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { Card } from 'src/app/models/card';
import { RepositoryService } from 'src/app/services/api-services/repository.service';
import { CardService } from 'src/app/services/api-services/card.service';

@Injectable()
export class CardStoreEffects {
  constructor(
    private repository: RepositoryService,
    private actions$: Actions,
    private cardService: CardService) {}

  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(CardActionTypes.LOAD_CARDS),
    mergeMap(() => this.repository.getAll<Card>(API_CARDS_URL).pipe(
      map(cards => new LoadCardsSuccess(cards))
    ))
  ));

  addCard$ = createEffect(() => this.actions$.pipe(
    ofType<AddCard>(CardActionTypes.ADD_CARD),
    switchMap(action => this.cardService.addCard(action).pipe(
      map(([card, list]) => new AddCardSuccess(list.id, card))
    ))
  ));

  deleteCard$ = createEffect(() => this.actions$.pipe(
    ofType<DeleteCard>(CardActionTypes.DELETE_CARD),
    switchMap(action => this.cardService.deleteCard(action).pipe(
      map(() => new DeleteCardSuccess(action.listId, action.cardId))
    ))
  ));

  saveDescription$ = createEffect(() => this.actions$.pipe(
    ofType<SaveDescription>(CardActionTypes.SAVE_DESCRIPTION),
    tap(action => this.cardService.changeDescription(action).subscribe())
  ), {dispatch: false});

  changeCardTitle$ = createEffect(() => this.actions$.pipe(
    ofType<ChangeCardTitle>(CardActionTypes.CHANGE_CARD_TITLE),
    tap(action => this.cardService.changeCardTitle(action).subscribe())
  ), {dispatch: false});

}