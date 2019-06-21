import { Component, OnInit, Input } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { ToggleChecklistItem, DeleteChecklistItem } from 'src/app/root-store/checklist-item-store/actions';

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

  @Input()
  item: ChecklistItem;

  constructor(
    private iconRegistry: IconRegistryService,
    private store$: Store<RootState>) {
      this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(UNCHECKED_ITEM_ICON);
    this.iconRegistry.registerIcon(CHECKED_ITEM_ICON);
    this.iconRegistry.registerIcon(CLOSE_ICON);
  }

  ngOnInit() {
    this.checkItemIcon = this.item.isChecked ? CHECKED_ITEM_ICON : UNCHECKED_ITEM_ICON;
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

}
