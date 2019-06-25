import { Injectable } from '@angular/core';
import { List } from 'src/app/models/list';
import { API_LISTS_URL, API_BOARDS_URL, API_CARDS_URL } from './repository.service';
import { Board } from 'src/app/models/board';
import { RepositoryService } from './repository.service';
import { forkJoin, Observable, from, concat } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { CardService } from './card.service';
import { SwapCards } from 'src/app/root-store/list-store/actions';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from 'src/app/models/card';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private repository: RepositoryService,
    private cardService: CardService) { }

  addList(list: List, boardId: string): Observable<[List, Board]> {
    return forkJoin(
      this.repository.addOne<List>(list, API_LISTS_URL),
      this.repository.getOne<Board>(`${API_BOARDS_URL}/${boardId}`).pipe(
        map(board => {
          board.lists.push(list.id);
          return board;
        }),
        switchMap(board => this.repository.updateOne<Board>(board, `${API_BOARDS_URL}/${board.id}`))
      )
    );
  }

  deleteList(listId: string, boardId: string): Observable<[List, Board]> {
    return forkJoin(
      this.deepDeleteList(listId),
      this.repository.getOne<Board>(`${API_BOARDS_URL}/${boardId}`).pipe(
        map(board => {
          board.lists = board.lists.filter(id => id !== listId);
          return board;
        }),
        switchMap(board => this.repository.updateOne<Board>(board, `${API_BOARDS_URL}/${board.id}`))
      )
    );
  }

  deepDeleteList(listId: string): Observable<any> {
    return concat(
      this.repository.getOne<List>(`${API_LISTS_URL}/${listId}`).pipe(
        switchMap(list => {
          return from(list.cards).pipe(
            map(card => this.cardService.deepDeleteCard(card).subscribe())
          )
        })
      ),
      this.repository.deleteOne<List>(`${API_LISTS_URL}/${listId}`)
    );
  }

  swapCards(action: SwapCards): Observable<any> {
    if(action.container.current !== action.container.previous) {
      return this.transferCards(action);
    }
    else {
      return this.moveCard(action);
    }
  }

  transferCards(action: SwapCards): Observable<any> {
    return forkJoin(
      this.repository.getOne<List>(`${API_LISTS_URL}/${action.container.previous}`),
      this.repository.getOne<List>(`${API_LISTS_URL}/${action.container.current}`),
      this.repository.getOne<Card>(`${API_CARDS_URL}/${action.cardId}`)
    ).pipe(
      map(([previousList, currentList, card]) => {
        transferArrayItem(previousList.cards, currentList.cards, action.index.previous, action.index.current);
        card.list = currentList.id;
        return ([previousList, currentList, card]);
      }),
      switchMap(([previous, current, card]) => [
        this.repository.updateOne<List>((previous as List), `${API_LISTS_URL}/${previous.id}`).subscribe(),
        this.repository.updateOne<List>((current as List), `${API_LISTS_URL}/${current.id}`).subscribe(),
        this.repository.updateOne<Card>((card as Card), `${API_CARDS_URL}/${card.id}`).subscribe()
      ])
    )
  }

  moveCard(action: SwapCards): Observable<any> {
    return this.repository.getOne<List>(`${API_LISTS_URL}/${action.container.current}`).pipe(
      map(list => {
        moveItemInArray(list.cards, action.index.previous, action.index.current);
        return list;
      }),
      switchMap(list => this.repository.updateOne<List>(list, `${API_LISTS_URL}/${list.id}`))
    )
  }
}