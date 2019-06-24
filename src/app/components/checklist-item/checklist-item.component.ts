import { Component, OnInit, Input } from '@angular/core';
import { IconRegistryService, UNCHECK_ICON, CHECKED_ICON, CLOSE_ICON } from 'src/app/services/icon-registry.service';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { ToggleChecklistItem, DeleteChecklistItem, SaveChecklistItemText } from 'src/app/root-store/checklist-item-store/actions';

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements OnInit {
  checkItemIcon: string;
  closeIcon: string;
  isEditableFormVisible: boolean;
  itemText: string;

  @Input()
  item: ChecklistItem;

  constructor(
    private iconRegistry: IconRegistryService,
    private store$: Store<RootState>) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(UNCHECK_ICON);
    this.iconRegistry.registerIcon(CHECKED_ICON);
    this.iconRegistry.registerIcon(CLOSE_ICON);
  }

  ngOnInit() {
    this.checkItemIcon = this.item.isChecked ? CHECKED_ICON : UNCHECK_ICON;
    this.closeIcon = CLOSE_ICON;
    this.isEditableFormVisible = false;
  }

  toggleCheckbox() {
    this.store$.dispatch(new ToggleChecklistItem(this.item.id));
  }

  deleteItem() {
    console.log(this.item);
    this.store$.dispatch(new DeleteChecklistItem(this.item.checklist, this.item.id));
  }

  hideEditableForm() {
    this.isEditableFormVisible = false;
  }

  showEditableForm() {
    this.isEditableFormVisible = true;
  }

  resetItemText() {
    this.itemText = this.item.text;
  }

  onItemTextChange(event) {
    this.itemText = event.target.value;
  }

  saveItemText() {
    this.store$.dispatch(new SaveChecklistItemText(this.item.id, this.itemText));
    this.hideEditableForm();
  }
}
