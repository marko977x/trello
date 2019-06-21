import { Component, OnInit, Input } from '@angular/core';
import { IconRegistryService } from 'src/app/services/icon-registry.service';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { Observable } from 'rxjs';
import { Checklist } from 'src/app/models/checklist';
import { selectChecklistById } from 'src/app/root-store/checklist-store/selectors';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { selectChecklistItems } from 'src/app/root-store/checklist-item-store/selectors';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  checklistItems$: Observable<ChecklistItem[]>;

  @Input()
  checklistId: string;

  constructor(
      private iconRegistry: IconRegistryService,
      private store$: Store<RootState>) {
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.registerIcon('check-box-icon');
  }

  ngOnInit() {
    this.checklistItems$ = this.store$.select(selectChecklistItems(this.checklistId));
  }

  calculateProgressPercentage(): number {
    let result: number = 0;
    this.checklistItems$.subscribe(items => {
      result = items.filter(item => item.isChecked).length / items.length;
    });
    return result * 100;
  }

}
