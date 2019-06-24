import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardStoreModule } from './board-store/board-store.module';
import { ListStoreModule } from './list-store/list-store.module';
import { CardStoreModule } from './card-store/card-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChecklistStoreModule } from './checklist-store/checklist-store.module';
import { UserStoreModule } from './user-store/user-store.module';
import { ChecklistItemStoreModule } from './checklist-item-store/checklist-item-store.module';
import { UiStoreModule } from './ui-store/ui-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BoardStoreModule,
    ListStoreModule,
    CardStoreModule,
    ChecklistStoreModule,
    UserStoreModule,
    ChecklistItemStoreModule,
    UiStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }
