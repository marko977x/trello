import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

@Component({
  selector: 'app-card-details-window',
  templateUrl: './card-details-window.component.html',
  styleUrls: ['./card-details-window.component.scss']
})
export class CardDetailsWindowComponent implements OnInit {

  constructor(private iconRegistry: IconRegistryService) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('close-icon');
    this.iconRegistry.registerIcon('card-icon');
  }

  ngOnInit() {
  }

}
