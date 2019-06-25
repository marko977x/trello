import { Component, OnInit, Input } from '@angular/core';
import { IconRegistryService, CLOSE_ICON, CHECKBOX_ICON } from 'src/app/services/icon-registry.service';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { Observable } from 'rxjs';
import { Checklist } from 'src/app/models/checklist';
import { selectChecklistById } from 'src/app/root-store/checklist-store/selectors';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { selectChecklistItems } from 'src/app/root-store/checklist-item-store/selectors';
import { DeleteChecklist, SwapItems } from 'src/app/root-store/checklist-store/actions';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AddChecklistItem } from 'src/app/root-store/checklist-item-store/actions';
import * as uuid from "uuid";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  checklistItems$: Observable<ChecklistItem[]>;
  checklist$: Observable<Checklist>;
  isEditableFormVisible: boolean;
  closeIcon: string = CLOSE_ICON;
  checkboxIcon: string = CHECKBOX_ICON;

  @Input()
  checklistId: string;
  @Input()
  cardId: string;
  @Input()
  listId: string;

  constructor(
      private iconRegistry: IconRegistryService,
      private store$: Store<RootState>) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon(CHECKBOX_ICON);
    this.iconRegistry.registerIcon(CLOSE_ICON);
  }

  ngOnInit() {
    this.checklistItems$ = this.store$.select(selectChecklistItems(this.checklistId));
    this.checklist$ = this.store$.select(selectChecklistById(this.checklistId));
  }

  calculateProgressPercentage(): string {
    let result: number = 0;
    this.checklistItems$.subscribe(items => {
      if(items && items.length != 0)
        result = items.filter(item => item.isChecked).length / items.length;
      else return 0;
    });
    return (result * 100).toFixed(0);
  }

  deleteChecklist() {
    this.store$.dispatch(new DeleteChecklist(this.cardId, this.checklistId));
  }

  drop(event: CdkDragDrop<string[]>) {
    this.store$.dispatch(new SwapItems(this.checklistId, event.previousIndex, event.currentIndex));
  }
  
  closeEditableForm() {
    this.isEditableFormVisible = false;
  }

  addNewItem(newItemText: string) {
    this.store$.dispatch(new AddChecklistItem(this.checklistId, {
      id: uuid.v4(),
      checklist: this.checklistId,
      isChecked: false,
      text: newItemText
    }));

    this.closeEditableForm();
  }

  showEditableForm() {
    this.isEditableFormVisible = true;
  }

}
