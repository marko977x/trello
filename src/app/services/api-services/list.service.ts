import { Injectable } from '@angular/core';
import { List } from 'src/app/models/list';
import { API_LISTS_URL, API_BOARDS_URL, API_CARDS_URL } from './repository.service';
import { AddList, DeleteList } from 'src/app/root-store/list-store/actions';
import { Board } from 'src/app/models/board';
import { RepositoryService } from './repository.service';
import { forkJoin, Observable, from, concat } from 'rxjs';
import { switchMap, map, mergeMapTo, mergeMap } from 'rxjs/operators';
import { Card } from 'src/app/models/card';
import { CardService } from './card.service';

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
      this.repository.deleteOne<List>(`${API_LISTS_URL}/${listId}`)
    )
  }
}