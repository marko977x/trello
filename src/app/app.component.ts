import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './root-store/root-state';
import { LoadBoards } from './root-store/board-store/actions';
import { LoadLists } from './root-store/list-store/actions';
import { LoadCards } from './root-store/card-store/actions';
import { LoadChecklists } from './root-store/checklist-store/actions';
import { LoadChecklistItems } from './root-store/checklist-item-store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Trello';

  constructor(private store$: Store<RootState>) {
    this.store$.dispatch(new LoadBoards());
    this.store$.dispatch(new LoadLists());
    this.store$.dispatch(new LoadCards());
    this.store$.dispatch(new LoadChecklists());
    this.store$.dispatch(new LoadChecklistItems());
  }
}