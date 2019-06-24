import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { AddChecklist, SwapItems, DeleteChecklist } from 'src/app/root-store/checklist-store/actions';
import { Checklist } from 'src/app/models/checklist';
import { API_CARDS_URL, API_CHECKLISTS_URL } from './repository.service';
import { Card } from 'src/app/models/card';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private repository: RepositoryService) { }

    addChecklist(action: AddChecklist): Observable<[Checklist, Card]> {
      return forkJoin(
        this.repository.addOne<Checklist>(action.checklist, API_CHECKLISTS_URL),
        this.repository.getOne<Card>(`${API_CARDS_URL}/${action.cardId}`).pipe(
          map(card => {
            card.checklists.push(action.checklist.id);
            return card;
          }),
          switchMap(card => this.repository.updateOne<Card>(card, `${API_CARDS_URL}/${card.id}`))
        )
      );
    }

    swapItems(action: SwapItems): Observable<Checklist> {
      return this.repository.getOne<Checklist>(`${API_CARDS_URL}/${action.checklistId}`).pipe(
        map(checklist => {
          console.log("Swap");
          moveItemInArray(checklist.items, action.previousIndex, action.currentIndex);
          return checklist;
        }),
        switchMap(checklist => this.repository.updateOne<Checklist>(checklist, `${API_CHECKLISTS_URL}/${checklist.id}`))
      );
    }

    deleteChecklist(action: DeleteChecklist): Observable<[Checklist, Card]> {
      return forkJoin(
        this.repository.deleteOne<Checklist>(`${API_CHECKLISTS_URL}/${action.checklistId}`),
        this.repository.getOne<Card>(`${API_CARDS_URL}/${action.cardId}`).pipe(
          map(card => {
            card.checklists = card.checklists.filter(checklistId => checklistId !== action.checklistId);
            return card;
          }),
          switchMap(card => this.repository.updateOne<Card>(card, `${API_CARDS_URL}/${card.id}`))
        )
      );
    }
}