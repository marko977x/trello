import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './containers/board/board.component';
import { HomeComponent } from './containers/home/home.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const DASHBOARD_URL = "/dashboard";
export const HOME_URL = "/home";
export const BOARD_URL = "/board";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'board',
    component: BoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
