import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ChecklistReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChecklistStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('checklist', ChecklistReducer),
    EffectsModule.forFeature([ChecklistStoreEffects])
  ],
  providers: [ChecklistStoreEffects]
})
export class ChecklistStoreModule { }
