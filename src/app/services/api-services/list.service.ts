import { Injectable } from '@angular/core';
import { List } from 'src/app/models/list';
import { API_LISTS_URL, API_BOARDS_URL, API_CARDS_URL } from './repository.service';
import { Board } from 'src/app/models/board';
import { RepositoryService } from './repository.service';
import { forkJoin, Observable, from, concat, of } from 'rxjs';
import { switchMap, map, mergeMapTo, mergeMap, tap, catchError } from 'rxjs/operators';
import { CardService } from './card.service';
import { SwapCards } from 'src/app/root-store/list-store/actions';
import { moveItemInArray } from '@angular/cdk/drag-drop';

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

  deepDeleteList(listId: string) {
    return concat(
      this.repository.getOne<List>(`${API_LISTS_URL}/${listId}`).pipe(
        switchMap(list => list.cards),
        mergeMap(card => this.cardService.deepDeleteCard(card))
      ),
      this.repository.deleteOne<List>(`${API_LISTS_URL}/${listId}`).pipe(
        catchError(error => of(console.log(error)))
      )
    )
  }

  swapCards(action: SwapCards): Observable<List> {
    return this.repository.getOne<List>(`${API_LISTS_URL}/${action.listId}`).pipe(
      map((list) => {
        moveItemInArray(list.cards, action.previousIndex, action.currentIndex);
        return list;
      }),
      switchMap(list => this.repository.updateOne<List>(list, `${API_LISTS_URL}/${list.id}`))
    )
  }
}