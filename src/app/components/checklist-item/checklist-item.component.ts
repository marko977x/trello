import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';

const UNCHECKED_ITEM_ICON: string = 'uncheck-icon';
const CHECKED_ITEM_ICON: string = 'checked-icon';
const CLOSE_ICON: string = 'close-icon';

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements OnInit {
  checkItemIcon: string;
  closeIcon: string;
  isEditableFormVisible: boolean;

  constructor(private iconRegistry: IconRegistryService) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(UNCHECKED_ITEM_ICON);
    this.iconRegistry.registerIcon(CHECKED_ITEM_ICON);
    this.iconRegistry.registerIcon(CLOSE_ICON);
  }

  ngOnInit() {
    this.checkItemIcon = UNCHECKED_ITEM_ICON;
    this.closeIcon = CLOSE_ICON;
    this.isEditableFormVisible = false;
  }

  toggleCheckbox() {
    this.checkItemIcon = this.checkItemIcon === UNCHECKED_ITEM_ICON ? 
      CHECKED_ITEM_ICON : UNCHECKED_ITEM_ICON;
  }

  hideEditableForm() {
    this.isEditableFormVisible = false;
  }

  showEditableForm() {
    this.isEditableFormVisible = true;
  }

}
