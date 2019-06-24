import { Injectable } from '@angular/core';
import { RepositoryService, API_CHECKLIST_ITEMS_URL } from './repository.service';
import { ChecklistItem } from 'src/app/models/checklist-item';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
}
