import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

const CHECKBOX_ICON: string = 'check-box-icon';
const MOVE_ICON: string = 'move-icon';

@Component({
  selector: 'app-card-details-sidebar',
  templateUrl: './card-details-sidebar.component.html',
  styleUrls: ['./card-details-sidebar.component.scss']
})
export class CardDetailsSidebarComponent implements OnInit {
  checkboxIcon: string = CHECKBOX_ICON;
  moveIcon: string = MOVE_ICON;

  constructor(private iconRegistry: IconRegistryService) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(CHECKBOX_ICON);
    this.iconRegistry.registerIcon(MOVE_ICON);
  }

  ngOnInit() {
  }

}
