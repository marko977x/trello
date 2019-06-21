import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiReducer } from './reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('ui', UiReducer)
  ]
})
export class UiStoreModule { }
