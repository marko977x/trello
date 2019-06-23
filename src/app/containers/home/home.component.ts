import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { selectUiState } from 'src/app/root-store/ui-store/selectors';
import { Observable } from 'rxjs';
import { Ui } from 'src/app/models/ui';
import { isEmpty } from 'src/app/services/object-checker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ui$: Observable<Ui>;

  constructor(private router: Router, private store$: Store<RootState>) {
    this.ui$ = this.store$.select(selectUiState);
  }

  ngOnInit() {
    // this.ui$.subscribe(ui => {
    //   if(!isEmpty(ui) && ui.loggedUser != "") {
    //     this.router.navigate(['dashboard']);
    //   }
    // });
  }
  
}
