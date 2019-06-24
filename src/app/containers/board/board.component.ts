import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/models/board';
import { selectBoardById, selectSelectedBoard } from 'src/app/root-store/board-store/selectors';
import { RootState } from 'src/app/root-store/root-state';
import { IMAGES_PATHS } from 'src/app/models/app';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { AddBoard } from 'src/app/root-store/board-store/actions';
import { getItemFromLocalStorage } from 'src/app/services/local-storage';
import { Ui } from 'src/app/models/ui';
import * as uuid from "uuid";
import { AddList } from 'src/app/root-store/list-store/actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  board$: Observable<Board>;
  isEditableFormVisible: boolean;

  constructor(
    private store$: Store<RootState>,
    private iconRegistry: IconRegistryService) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('plus-icon');
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

  showEditableForm() {
    this.isEditableFormVisible = true;
  }

  closeEditableForm() {
    this.isEditableFormVisible = false;
  }

  addNewList(listTitle: string) {
    let boardId: string = getItemFromLocalStorage<Ui>('ui').boardId;
    this.store$.dispatch(new AddList(boardId, {
      id: uuid.v4(),
      board: boardId,
      cards: [],
      title: listTitle
    }));

    this.closeEditableForm();
  }

}
