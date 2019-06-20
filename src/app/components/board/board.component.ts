import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/models/board';
import { selectBoardById } from 'src/app/root-store/board-store/selectors';
import { RootState } from 'src/app/root-store/root-state';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  board$: Observable<Board>;

  constructor(private store$: Store<RootState>) {
  }

  ngOnInit() {
    this.board$ = this.store$.select(selectBoardById("board1"));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

}
