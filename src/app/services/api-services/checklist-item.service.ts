import { Injectable } from '@angular/core';
import { RepositoryService, API_CHECKLIST_ITEMS_URL, API_CHECKLISTS_URL } from './repository.service';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { Observable, forkJoin, concat, of } from 'rxjs';
import { AddChecklistItem, SaveChecklistItemText, DeleteChecklistItem } from 'src/app/root-store/checklist-item-store/actions';
import { Checklist } from 'src/app/models/checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistItemService {

  constructor(private repository: RepositoryService) { }

  toggleChecklistItem(id: string): Observable<ChecklistItem> {
    return this.repository.getOne<ChecklistItem>(`${API_CHECKLIST_ITEMS_URL}/${id}`).pipe(
      map(item => {
        item.isChecked = !item.isChecked;
        return item;
      }),
      switchMap(item => this.repository.updateOne<ChecklistItem>(item, `${API_CHECKLIST_ITEMS_URL}/${item.id}`))
    );
  }

  addChecklistItem(action: AddChecklistItem): Observable<[ChecklistItem, Checklist]> {
    return forkJoin(
      this.repository.addOne<ChecklistItem>(action.item, API_CHECKLIST_ITEMS_URL),
      this.repository.getOne<Checklist>(`${API_CHECKLISTS_URL}/${action.checklistId}`).pipe(
        map(checklist => {
          checklist.items.push(action.item.id);
          return checklist;
        }),
        switchMap(checklist => this.repository.updateOne<Checklist>(
          checklist, `${API_CHECKLISTS_URL}/${checklist.id}`))
      )
    )
  }

  changeChecklistItemText(action: SaveChecklistItemText): Observable<ChecklistItem> {
    const url: string = `${API_CHECKLIST_ITEMS_URL}/${action.itemId}`;
    return this.repository.getOne<ChecklistItem>(url).pipe(
      map(checklistItem => {
        checklistItem.text = action.text;
        return checklistItem;
      }),
      switchMap(checklistItem => this.repository.updateOne<ChecklistItem>(checklistItem, url))
    )
  }

  deleteChecklistItem(action: DeleteChecklistItem): Observable<any> {
    return concat(
      this.repository.getOne<Checklist>(`${API_CHECKLISTS_URL}/${action.checklistId}`).pipe(
        map(checklist => {
          checklist.items = checklist.items.filter(id => id !== action.itemId);
          return checklist;
        }),
        switchMap(checklist => this.repository.updateOne<Checklist>(
          checklist, `${API_CHECKLISTS_URL}/${checklist.id}`))
        ),
      this.repository.deleteOne<ChecklistItem>(`${API_CHECKLIST_ITEMS_URL}/${action.itemId}`).pipe(
        catchError(error => of(console.log(error)))
      )
    );
  }
}
