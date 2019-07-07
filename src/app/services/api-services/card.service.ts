import { Injectable } from '@angular/core';
import { RepositoryService, API_LISTS_URL, API_CARDS_URL } from './repository.service';
import { AddCard, DeleteCard, SaveDescription, ChangeCardTitle } from 'src/app/root-store/card-store/actions';
import { Card } from 'src/app/models/card';
import { List } from 'src/app/models/list';
import { Observable, forkJoin, concat, of, from } from 'rxjs';
import { flatMap, map, pluck, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { ChecklistService } from './checklist.service';
import { Checklist } from 'src/app/models/checklist';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private repository: RepositoryService,
    private checklistService: ChecklistService) { }

  addCard(action: AddCard): Observable<[Card, List]> {
    return forkJoin(
      this.repository.addOne<Card>(action.card, API_CARDS_URL),
      this.repository.getOne<List>(`${API_LISTS_URL}/${action.listId}`).pipe(
        map(list => {
          list.cards.push(action.card.id);
          return list;
        }),
        switchMap(list => this.repository.updateOne<List>(list, `${API_LISTS_URL}/${list.id}`))
      )
    )
  }

  deleteCard(cardId: string, listId: string): Observable<[Card, List]> {
    return forkJoin(
      this.deepDeleteCard(cardId),
      this.repository.getOne<List>(`${API_LISTS_URL}/${listId}`).pipe(
        map(list => {
          list.cards = list.cards.filter(id => id !== cardId);
          return list;
        }),
        switchMap(list => this.repository.updateOne<List>(list, `${API_LISTS_URL}/${list.id}`))
      )
    )
  }

  deepDeleteCard(cardId: string): Observable<any> {
    return concat(
      this.repository.getOne<Card>(`${API_CARDS_URL}/${cardId}`).pipe(
        switchMap(card => {
          return from(card.checklists).pipe(
            map(checklist => this.checklistService.deepDeleteChecklist(checklist).subscribe()),
          )
        })
      ),
      this.repository.deleteOne<Card>(`${API_CARDS_URL}/${cardId}`)
    );
  }

  changeDescription(action: SaveDescription): Observable<Card> {
    return this.repository.getOne<Card>(`${API_CARDS_URL}/${action.cardId}`).pipe(
      map(card => {
        card.description = action.description;
        return card;
      }),
      switchMap(card => this.repository.updateOne<Card>(card, `${API_CARDS_URL}/${card.id}`))
    )
  }

  changeCardTitle(action: ChangeCardTitle): Observable<Card> {
    return this.repository.getOne<Card>(`${API_CARDS_URL}/${action.cardId}`).pipe(
      map(card => {
        card.title = action.title;
        return card;
      }),
      switchMap(card => this.repository.updateOne<Card>(card, `${API_CARDS_URL}/${card.id}`))
    );
  }
}
