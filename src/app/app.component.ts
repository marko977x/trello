import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './root-store/root-state';
import { LoadBoards } from './root-store/board-store/actions';
import { LoadLists } from './root-store/list-store/actions';

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
  }
}