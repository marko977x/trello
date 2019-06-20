import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { BoardComponent } from './components/board/board.component';
import { RootStoreModule } from './root-store/root-store.module';
import { CardDetailsWindowComponent } from './components/card-details-window/card-details-window.component';
import { CardDescriptionComponent } from './components/card-description/card-description.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { ChecklistItemComponent } from './components/checklist-item/checklist-item.component';

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
    ChecklistItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    RootStoreModule
  ],
  entryComponents: [CardDetailsWindowComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
