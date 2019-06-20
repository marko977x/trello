import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { CardDetailsWindowComponent } from '../card-details-window/card-details-window.component';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  @Input()
  title: string = "Title";

  constructor(public dialog: MatDialog, private iconRegistry: IconRegistryService) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('check-box-icon');
  }

  ngOnInit() {
  }

  openCardDetailsWindow() {
    this.dialog.open(CardDetailsWindowComponent);
  }

}
