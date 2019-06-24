import { Component, OnInit, Output, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ListState } from 'src/app/root-store/list-store/state';
import { selectListById } from 'src/app/root-store/list-store/selectors';
import { List } from 'src/app/models/list';
import { DeleteList } from 'src/app/root-store/list-store/actions';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { AddCard } from 'src/app/root-store/card-store/actions';
import * as uuid from "uuid";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list$: Observable<List>;
  isEditableFormVisible: boolean;
  boardId: string;

  @Input()
  listId: string;
  @Input()
  connectedListsIds: string[];

  constructor(
    private store$: Store<ListState>, 
    private iconRegistry: IconRegistryService) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('plus-icon');
    this.iconRegistry.registerIcon('close-icon');
    this.iconRegistry.registerIcon('delete-icon');
  }

  ngOnInit() {
    this.list$ = this.store$.select(selectListById(this.listId));
    this.isEditableFormVisible = false;
    this.list$.subscribe(list => {
      if(list) this.boardId = list.board;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  showEditableForm() {
    this.isEditableFormVisible = true;
  }

  closeEditableForm() {
    this.isEditableFormVisible = false;
  }

  addNewCard(newCardTitle: string) {
    this.store$.dispatch(new AddCard(this.listId, {
      id: uuid.v4(),
      board: this.boardId,
      checklists: [],
      description: "",
      list: this.listId,
      title: newCardTitle
    }));

    this.closeEditableForm();
  }

  deleteList(listId: string) {
    this.store$.dispatch(new DeleteList(this.boardId, listId));
  }
}
