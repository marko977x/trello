import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CardDetailsWindowComponent } from '../card-details-window/card-details-window.component';
import { RootState } from 'src/app/root-store/root-state';
import { Store } from '@ngrx/store';
import { DeleteCard } from 'src/app/root-store/card-store/actions';
import { Card } from 'src/app/models/card';
import { SimpleModalComponent } from '../simple-modal/simple-modal.component';
import { AddChecklist } from 'src/app/root-store/checklist-store/actions';
import * as uuid from "uuid";

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
    private cardDetailsDialog: MatDialogRef<CardDetailsWindowComponent>,
    private store$: Store<RootState>,
    private matDialog: MatDialog) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(CHECKBOX_ICON);
    this.iconRegistry.registerIcon(MOVE_ICON);
    this.iconRegistry.registerIcon(DELETE_ICON);
  }

  ngOnInit() {
    this.cardDetailsDialog.componentInstance.card$.subscribe(card => this.card = card);
  }

  deleteCard() {
    this.cardDetailsDialog.close();
    this.store$.dispatch(new DeleteCard(this.card.list, this.card.id));
  }

  openNewChecklistModal() {
    let dialogRef = this.matDialog.open(SimpleModalComponent);

    dialogRef.componentInstance.OnSubmit.subscribe(
      (checklistTitle: string) => {
        this.createChecklist(checklistTitle);
        dialogRef.close();
      });

    dialogRef.componentInstance.OnCancel.subscribe(() => dialogRef.close());
  }

  createChecklist(checklistTitle: string) {
    console.log(checklistTitle);
    this.store$.dispatch(new AddChecklist(this.card.id, {
      id: uuid.v4(),
      title: checklistTitle,
      items: []
    }));
  }
}
