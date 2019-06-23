import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatProgressBarModule, MatCheckboxModule, MatTabGroup, MatTabsModule } from "@angular/material";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    DragDropModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    DragDropModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule
  ]
})
export class AppMaterialModule { }
