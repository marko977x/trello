import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { BoardComponent } from './containers/board/board.component';
import { RootStoreModule } from './root-store/root-store.module';
import { CardDetailsWindowComponent } from './components/card-details-window/card-details-window.component';
import { CardDescriptionComponent } from './components/card-description/card-description.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { ChecklistItemComponent } from './components/checklist-item/checklist-item.component';
import { CardDetailsSidebarComponent } from './components/card-details-sidebar/card-details-sidebar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    CardDetailsComponent,
    BoardComponent,
    CardDetailsWindowComponent,
    CardDescriptionComponent,
    ChecklistComponent,
    ChecklistItemComponent,
    CardDetailsSidebarComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    RootStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  entryComponents: [CardDetailsWindowComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
