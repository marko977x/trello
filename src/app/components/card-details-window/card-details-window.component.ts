import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';
import { RootState } from 'src/app/root-store/root-state';
import { Store } from '@ngrx/store';
import { selectCardById } from 'src/app/root-store/card-store/selectors';

@Component({
  selector: 'app-card-details-window',
  templateUrl: './card-details-window.component.html',
  styleUrls: ['./card-details-window.component.scss']
})
export class CardDetailsWindowComponent implements OnInit {
  card$: Observable<Card>;

  constructor(
    private iconRegistry: IconRegistryService,
    private store$: Store<RootState>) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('close-icon');
    this.iconRegistry.registerIcon('card-icon');
  }

  ngOnInit() {
  }

}
