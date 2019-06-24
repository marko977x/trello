import { Component, OnInit } from '@angular/core';
import { IconRegistryService, CLOSE_ICON, CARD_ICON } from 'src/app/services/icon-registry.service';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';
import { RootState } from 'src/app/root-store/root-state';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material';
import { ChangeCardTitle } from 'src/app/root-store/card-store/actions';

@Component({
  selector: 'app-card-details-window',
  templateUrl: './card-details-window.component.html',
  styleUrls: ['./card-details-window.component.scss']
})
export class CardDetailsWindowComponent implements OnInit {
  card$: Observable<Card>;
  isEditFieldVisible: boolean;
  closeIcon: string = CLOSE_ICON;
  cardIcon: string = CARD_ICON;

  constructor(
    private iconRegistry: IconRegistryService,
    private store$: Store<RootState>,
    private dialogRef: MatDialogRef<CardDetailsWindowComponent>) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(CLOSE_ICON);
    this.iconRegistry.registerIcon(CARD_ICON);
  }

  ngOnInit() {
    this.isEditFieldVisible = false;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showEditableForm() {
    this.isEditFieldVisible = true;
  }

  closeEditableForm() {
    this.isEditFieldVisible = false;
  }

  saveCardTitle(title: string, cardId: string) {
    this.store$.dispatch(new ChangeCardTitle(cardId, title));
    this.closeEditableForm();
  }

}
