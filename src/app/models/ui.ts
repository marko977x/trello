import { Board } from './board';

export interface Ui {
  loggedUser: string,
  isDashboardPage: boolean,
  board: Board
}