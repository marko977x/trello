import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { CardState, CardAdapter } from './state';
import { Card } from 'src/app/models/card';
import { Dictionary } from '@ngrx/entity';

export const selectCardState: MemoizedSelector<object, CardState> = 
  createFeatureSelector('card');

export const selectAllCards: (state: object) => 
  Card[] = CardAdapter.getSelectors(selectCardState).selectAll;

export const selectAllCardEntities: (state: object) =>
  Dictionary<Card> = CardAdapter.getSelectors(selectCardState).selectEntities;

export const selectCardById = (id: string) => {
  return createSelector(
    selectAllCards,
    (cards: Card[]) => {
      if(cards) return cards.find(card => card.id === id);
      else return null;
    }
  )
}