import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardStoreModule } from './board-store/board-store.module';
import { ListStoreModule } from './list-store/list-store.module';
import { CardStoreModule } from './card-store/card-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BoardStoreModule,
    ListStoreModule,
    CardStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }
