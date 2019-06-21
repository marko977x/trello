import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { RootState } from 'src/app/root-store/root-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { selectBoardById } from 'src/app/root-store/board-store/selectors';
import { Ui } from 'src/app/models/ui';
import { DASHBOARD_URL } from 'src/app/app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ui: Ui;
  dashboardDefaultTitle: string = "Welcome to Trello";
  dashboardUrl: string = DASHBOARD_URL;

  constructor(
    private iconRegistry: IconRegistryService,
    private store$: Store<RootState>) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('account-icon');
    this.iconRegistry.registerIcon('home-icon');
  }

  ngOnInit() {
    this.store$.select(state => state.ui).subscribe(ui => this.ui = ui);
  }

  getHeaderTitle() {
    if(this.ui) {
      return this.ui.board ? this.ui.board.title : this.dashboardDefaultTitle;
    }
  }

}
