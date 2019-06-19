import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BoardReducer } from './reducer';
import { BoardStoreEffects } from './effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('board', BoardReducer),
    EffectsModule.forFeature([BoardStoreEffects])
  ],
  providers: [BoardStoreEffects]
})
export class BoardStoreModule { }
