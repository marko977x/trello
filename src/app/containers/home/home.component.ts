import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadEnd, ActivationStart, ActivationEnd, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { selectUiState } from 'src/app/root-store/ui-store/selectors';
import { Observable } from 'rxjs';
import { Ui } from 'src/app/models/ui';
import { isEmpty } from 'src/app/services/object-checker';
import { getItemFromLocalStorage } from 'src/app/services/local-storage';
import { HOME_URL, DASHBOARD_URL } from 'src/app/routes-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() { }
  
}
