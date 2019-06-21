import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ChecklistItemReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChecklistItemStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('checklistItem', ChecklistItemReducer),
    EffectsModule.forFeature([ChecklistItemStoreEffects])
  ],
  providers: [ChecklistItemStoreEffects]
})
export class ChecklistItemStoreModule { }
