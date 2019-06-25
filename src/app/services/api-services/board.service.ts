import { Injectable } from '@angular/core';
import { RepositoryService, API_BOARDS_URL, API_USERS_URL } from './repository.service';
import { AddBoard, SwapLists } from 'src/app/root-store/board-store/actions';
import { Observable, forkJoin, concat } from 'rxjs';
import { Board } from 'src/app/models/board';
import { User } from 'src/app/models/user';
import { map, switchMap } from 'rxjs/operators';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private repository: RepositoryService) { }

  addBoard(action: AddBoard): Observable<[Board, User]> {
    return forkJoin(
      this.repository.addOne<Board>(action.board, API_BOARDS_URL),
      this.repository.getOne<User>(`${API_USERS_URL}/${action.userId}`).pipe(
        map(user => {
          user.boards.push(action.board.id);
          return user;
        }),
        switchMap(user => this.repository.updateOne<User>(user, `${API_USERS_URL}/${user.id}`))
      )
    )
  }

  swapLists(action: SwapLists): Observable<Board> {
    const boardUrl: string = `${API_BOARDS_URL}/${action.boardId}`;
    return this.repository.getOne<Board>(boardUrl).pipe(
      map(board => {
        moveItemInArray(board.lists, action.previousIndex, action.currentIndex);
        return board;
      }),
      switchMap((board) => this.repository.updateOne<Board>(board, boardUrl))
    );
  }
}