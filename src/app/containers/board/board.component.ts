import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/models/board';
import { selectBoardById } from 'src/app/root-store/board-store/selectors';
import { RootState } from 'src/app/root-store/root-state';
import { selectSelectedBoard } from 'src/app/root-store/ui-store/selectors';
import { IMAGES_PATHS } from 'src/app/models/app';

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
    this.board$ = this.store$.select(selectSelectedBoard());
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  getBackgroundImage(index: number) {
    return IMAGES_PATHS[index];
  }

}
