import { Component, OnInit } from '@angular/core';
import { IconRegistryService, ACCOUNT_ICON, HOME_ICON } from 'src/app/services/icon-registry.service';
import { RootState } from 'src/app/root-store/root-state';
import { Store } from '@ngrx/store';
import { Ui } from 'src/app/models/ui';
import { isEmpty } from 'src/app/services/object-checker';
import { Router } from '@angular/router';
import { NavigateToDashboard, ClearUiStore } from 'src/app/root-store/ui-store/actions';
import { removeItemFromLocalStorage, setItemToLocalStorage } from 'src/app/services/local-storage';
import { DASHBOARD_URL, HOME_URL } from 'src/app/routes-constants';
import { initialState } from 'src/app/root-store/ui-store/reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ui: Ui;
  dashboardDefaultTitle: string = "Welcome to Trello";
  dashboardTitle: string;
  homeIcon: string = HOME_ICON;
  accountIcon: string = ACCOUNT_ICON;

  constructor(
    private iconRegistry: IconRegistryService,
    private store$: Store<RootState>,
    private router: Router) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(ACCOUNT_ICON);
    this.iconRegistry.registerIcon(HOME_ICON);
  }

  ngOnInit() {
    this.store$.select(state => state).subscribe(state => {
      if(!isEmpty(state.ui) && !isEmpty(state.board.entities)) {
        this.ui = state.ui;
        if(!state.ui.isDashboardPage && !isEmpty(state.ui.boardId))
          this.dashboardTitle = state.board.entities[this.ui.boardId].title;
        else
          this.dashboardTitle = this.dashboardDefaultTitle;
      }
    });
  }

  getHeaderTitle() {
    if(this.ui) {
      return this.ui.boardId !== "" ? this.dashboardTitle : this.dashboardDefaultTitle;
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/' + DASHBOARD_URL]);
    this.store$.dispatch(new NavigateToDashboard());
  }

  logout() {
    this.store$.dispatch(new ClearUiStore());
    setItemToLocalStorage<Ui>('ui', initialState);
    this.router.navigate(['/' + HOME_URL]);
  }

}
