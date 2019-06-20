import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

@Component({
  selector: 'app-card-description',
  templateUrl: './card-description.component.html',
  styleUrls: ['./card-description.component.scss']
})
export class CardDescriptionComponent implements OnInit {

  constructor(private iconRegistry: IconRegistryService) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('description-icon');
  }

  ngOnInit() {
  }

}
