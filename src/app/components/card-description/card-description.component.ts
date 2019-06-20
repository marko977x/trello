import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

const CLOSE_ICON: string = 'close-icon';
const DESCRIPTION_ICON: string = 'description-icon';

@Component({
  selector: 'app-card-description',
  templateUrl: './card-description.component.html',
  styleUrls: ['./card-description.component.scss']
})

export class CardDescriptionComponent implements OnInit {
  isEditableFormVisible: boolean;
  closeIcon: string;
  descriptionIcon: string;

  constructor(private iconRegistry: IconRegistryService) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('description-icon');
    this.iconRegistry.registerIcon('close-icon');
  }

  ngOnInit() {
    this.isEditableFormVisible = false;
    this.closeIcon = CLOSE_ICON;
    this.descriptionIcon = DESCRIPTION_ICON;
  }

  changeFocusToEditableForm() {
    this.isEditableFormVisible = true;
  }

  hideEditableForm() {
    this.isEditableFormVisible = false;
  }

}
