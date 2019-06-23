import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { RootState } from 'src/app/root-store/root-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { selectBoardById } from 'src/app/root-store/board-store/selectors';
import { Ui } from 'src/app/models/ui';
import { DASHBOARD_URL } from 'src/app/app-routing.module';
import { isEmpty } from 'src/app/services/object-checker';
import { RouterLink, Router } from '@angular/router';
import { NavigateToDashboard, ClearUiStore } from 'src/app/root-store/ui-store/actions';
import { removeItemFromLocalStorage } from 'src/app/services/local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ui: Ui;
  dashboardDefaultTitle: string = "Welcome to Trello";
  dashboardUrl: string = DASHBOARD_URL;
  dashboardTitle: string;

  constructor(
    private iconRegistry: IconRegistryService,
    private store$: Store<RootState>,
    private router: Router) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('account-icon');
    this.iconRegistry.registerIcon('home-icon');
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
    this.router.navigate(['/' + this.dashboardUrl]);
    this.store$.dispatch(new NavigateToDashboard());
  }

  logout() {
    this.store$.dispatch(new ClearUiStore());
    removeItemFromLocalStorage('ui');
    this.router.navigate(['/home']);
  }

}
