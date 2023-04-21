import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentComponent } from './appointment.component';
import { AllComponent } from './all/all.component';

@NgModule({
  declarations: [NewComponent, AppointmentComponent, AllComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  bootstrap: [NewComponent],
  exports: [NewComponent, AppointmentComponent],
})
export class AppointmentModule {}
