import { Component, OnInit, Output, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ListState } from 'src/app/root-store/list-store/state';
import { selectListState, selectListById } from 'src/app/root-store/list-store/selectors';
import { List } from 'src/app/models/list';
import { LoadLists } from 'src/app/root-store/list-store/actions';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list$: Observable<List>;

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
  }

  ngOnInit() {
    this.list$ = this.store$.select(selectListById(this.listId));
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
}
