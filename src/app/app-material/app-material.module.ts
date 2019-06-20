import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatProgressBarModule } from "@angular/material";
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';

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
    MatProgressBarModule
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
    MatProgressBarModule
  ]
})
export class AppMaterialModule { }