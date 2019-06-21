import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CardDetailsWindowComponent } from '../card-details-window/card-details-window.component';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { selectCardById } from 'src/app/root-store/card-store/selectors';
import { selectCardChecklistsItems } from 'src/app/root-store/checklist-item-store/selectors';
import { ChecklistItem } from 'src/app/models/checklist-item';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  card$: Observable<Card>;
  cardChecklistItems$: Observable<ChecklistItem[]>;

  @Input()
  id: string;

  constructor(
      public dialog: MatDialog,
      private iconRegistry: IconRegistryService,
      private store$: Store<RootState>) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('check-box-icon');
  }

  ngOnInit() {
    this.card$ = this.store$.select(selectCardById(this.id));
    this.cardChecklistItems$ = this.store$.select(selectCardChecklistsItems(this.id));
  }

  openCardDetailsWindow() {
    const modal = this.dialog.open(CardDetailsWindowComponent);
    modal.componentInstance.card$ = this.card$;
  } 

  calculateChecklistItemsRatio(): string {
    let result: string = "0/0";
    this.cardChecklistItems$.subscribe(items => {
      if(items)
        result = items.filter(item => item.isChecked).length + "/" + items.length;
    });
    return result;
  }
}
