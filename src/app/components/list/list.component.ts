import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ListState } from 'src/app/root-store/list-store/state';
import { selectListById } from 'src/app/root-store/list-store/selectors';
import { List } from 'src/app/models/list';
import { DeleteList, SwapCards } from 'src/app/root-store/list-store/actions';
import { IconRegistryService, PLUS_ICON, DELETE_ICON } from 'src/app/services/icon-registry.service';
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
  plusIcon: string = PLUS_ICON;
  deleteIcon: string = DELETE_ICON;

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
    this.iconRegistry.registerIcon(PLUS_ICON);
    this.iconRegistry.registerIcon(DELETE_ICON);
  }

  ngOnInit() {
    this.list$ = this.store$.select(selectListById(this.listId));
    this.isEditableFormVisible = false;
    this.list$.subscribe(list => {
      if(list) this.boardId = list.board;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.store$.dispatch(new SwapCards(
      {previous: event.previousContainer.id, current: event.container.id},
      {previous: event.previousIndex, current: event.currentIndex},
      event.previousContainer.data[event.previousIndex]
    ));
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
