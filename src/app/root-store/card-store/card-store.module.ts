import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CardReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { CardStoreEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('card', CardReducer),
    EffectsModule.forFeature([CardStoreEffects])
  ],
  providers: [CardStoreEffects]
})
export class CardStoreModule { }
