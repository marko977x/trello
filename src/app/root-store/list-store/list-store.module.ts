import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ListStoreEffects } from './effects';
import { ListReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('list', ListReducer),
    EffectsModule.forFeature([ListStoreEffects])
  ],
  providers: [ListStoreEffects]
})
export class ListStoreModule { }
