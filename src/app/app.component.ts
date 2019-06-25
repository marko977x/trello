import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './root-store/root-state';
import { LoadBoards } from './root-store/board-store/actions';
import { LoadLists } from './root-store/list-store/actions';
import { LoadCards } from './root-store/card-store/actions';
import { LoadChecklists } from './root-store/checklist-store/actions';
import { LoadChecklistItems } from './root-store/checklist-item-store/actions';
import { LoadUsers } from './root-store/user-store/actions';
import { setItemToLocalStorage, UI_STORE_KEY } from './services/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(private store$: Store<RootState>, private router: Router) {
    this.store$.dispatch(new LoadBoards());
    this.store$.dispatch(new LoadLists());
    this.store$.dispatch(new LoadCards());
    this.store$.dispatch(new LoadChecklists());
    this.store$.dispatch(new LoadChecklistItems());
    this.store$.dispatch(new LoadUsers());

    this.store$.subscribe((state: RootState) => {
      setItemToLocalStorage(UI_STORE_KEY, state.ui);
    });
  }

  ngOnInit() {
  }
}