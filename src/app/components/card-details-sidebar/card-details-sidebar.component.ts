import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { MatDialogRef } from '@angular/material';
import { CardDetailsWindowComponent } from '../card-details-window/card-details-window.component';
import { RootState } from 'src/app/root-store/root-state';
import { Store } from '@ngrx/store';
import { DeleteCard } from 'src/app/root-store/card-store/actions';
import { Card } from 'src/app/models/card';

const CHECKBOX_ICON: string = 'check-box-icon';
const MOVE_ICON: string = 'move-icon';
const DELETE_ICON: string = 'delete-icon';

@Component({
  selector: 'app-card-details-sidebar',
  templateUrl: './card-details-sidebar.component.html',
  styleUrls: ['./card-details-sidebar.component.scss']
})
export class CardDetailsSidebarComponent implements OnInit {
  checkboxIcon: string = CHECKBOX_ICON;
  moveIcon: string = MOVE_ICON;
  deleteIcon: string = DELETE_ICON;
  card: Card;

  constructor(
    private iconRegistry: IconRegistryService,
    private dialogRef: MatDialogRef<CardDetailsWindowComponent>,
    private store$: Store<RootState>) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(CHECKBOX_ICON);
    this.iconRegistry.registerIcon(MOVE_ICON);
    this.iconRegistry.registerIcon(DELETE_ICON);
  }

  ngOnInit() {
    this.dialogRef.componentInstance.card$.subscribe(card => this.card = card);
  }

  closeDialog() {
    this.dialogRef.close();
    this.store$.dispatch(new DeleteCard(this.card.listId, this.card.id));
  }

}
