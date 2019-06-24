import { Component, OnInit } from '@angular/core';
import { Ui } from 'src/app/models/ui';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { selectLoggedUserBoards } from 'src/app/root-store/board-store/selectors';
import { IMAGES_PATHS } from 'src/app/models/app';
import { OpenBoard } from 'src/app/root-store/ui-store/actions';
import { MatDialog } from '@angular/material';
import { SimpleModalComponent } from 'src/app/components/simple-modal/simple-modal.component';
import { AddBoard } from 'src/app/root-store/board-store/actions';
import { getItemFromLocalStorage } from 'src/app/services/local-storage';
import * as uuid from "uuid";
import { Router } from '@angular/router';
import { BOARD_URL } from 'src/app/app-routing.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards$: Observable<Board[]>;

  constructor(
    private store$: Store<RootState>,
    private newBoardDialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.boards$ = this.store$.select(selectLoggedUserBoards());
  }

  getBoardImage(index: number) {
    return IMAGES_PATHS[index];
  }

  openBoard(boardId: string) {
    this.store$.dispatch(new OpenBoard(boardId));
    this.router.navigate(['/' + BOARD_URL]);
  }

  openNewBoardDialog() {
    let dialog = this.newBoardDialog.open(SimpleModalComponent);
    dialog.componentInstance.placeholder = "New Board";
    dialog.componentInstance.OnCancel.subscribe(() => dialog.close());
    dialog.componentInstance.OnSubmit.subscribe((boardTitle: string) => {
      this.createBoard(boardTitle);
      dialog.close();
    });
  }

  createBoard(boardTitle: string) {
    let userId: string = getItemFromLocalStorage<Ui>('ui').loggedUser;
    this.store$.dispatch(new AddBoard(userId,
      {
        id: uuid.v4(),
        backgroundIndex: parseInt((Math.random() * IMAGES_PATHS.length).toFixed(0)),
        lists: [],
        title: boardTitle,
        user: userId
      }
    ));
  }

}
