import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './root-store/root-state';
import { LoadBoards } from './root-store/board-store/actions';
import { LoadLists } from './root-store/list-store/actions';
import { LoadCards } from './root-store/card-store/actions';
import { LoadChecklists } from './root-store/checklist-store/actions';
import { LoadChecklistItems } from './root-store/checklist-item-store/actions';
import { LoadUsers } from './root-store/user-store/actions';
import { setItemToLocalStorage, getItemFromLocalStorage } from './services/local-storage';
import { Ui } from './models/ui';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { isEmpty } from './services/object-checker';
import { HOME_URL, DASHBOARD_URL, BOARD_URL } from './routes-constants';

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
      setItemToLocalStorage('ui', state.ui);
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const isLogged: boolean = getItemFromLocalStorage<Ui>('ui').loggedUser !== "";
        if(isLogged) {
          if(event.url !== `/${DASHBOARD_URL}` || event.url !== `/${BOARD_URL}`)
            this.router.navigate([`/${DASHBOARD_URL}`]);
        }
        else {
          if(event.url !== `/${HOME_URL}`) this.router.navigate([`/${HOME_URL}`]);
        }
        this.router.navigate([event.url]);
      }
    });
  }
}