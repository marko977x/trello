import { Injectable } from '@angular/core';
import { List } from 'src/app/models/list';
import { API_LISTS_URL, API_BOARDS_URL } from './repository.service';
import { AddList, DeleteList } from 'src/app/root-store/list-store/actions';
import { Board } from 'src/app/models/board';
import { RepositoryService } from './repository.service';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private repository: RepositoryService) { }

  addList(action: AddList): Observable<[List, Board]> {
    return forkJoin(
      this.repository.addOne<List>(action.list, API_LISTS_URL),
      this.repository.getOne<Board>(`${API_BOARDS_URL}/${action.boardId}`).pipe(
        map(board => {
          board.lists.push(action.list.id);
          return board;
        }),
        switchMap(board => this.repository.updateOne<Board>(board, `${API_BOARDS_URL}/${board.id}`))
      )
    );
  }

  deleteList(action: DeleteList): Observable<[List, Board]> {
    return forkJoin(
      this.repository.deleteOne<List>(`${API_LISTS_URL}/${action.listId}`),
      this.repository.getOne<Board>(`${API_BOARDS_URL}/${action.boardId}`).pipe(
        map(board => {
          board.lists = board.lists.filter(listId => listId !== action.listId);
          return board;
        }),
        switchMap(board => this.repository.updateOne<Board>(board, `${API_BOARDS_URL}/${board.id}`))
      )
    );
  }
}