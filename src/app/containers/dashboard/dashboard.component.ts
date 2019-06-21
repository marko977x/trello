import { Component, OnInit } from '@angular/core';
import { Ui } from 'src/app/models/ui';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { selectLoggedUserBoards } from 'src/app/root-store/board-store/selectors';
import { IMAGES_PATHS } from 'src/app/models/app';
import { OpenBoard } from 'src/app/root-store/ui-store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards$: Observable<Board[]>;

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
    this.boards$ = this.store$.select(selectLoggedUserBoards());
  }

  getBoardImage(index: number) {
    return IMAGES_PATHS[index];
  }

  openBoard(board: Board) {
    this.store$.dispatch(new OpenBoard(board));
  }

}
