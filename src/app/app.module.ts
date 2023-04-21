import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppointmentModule } from './appointment/appointment.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentService } from './services/appointments.service';

@NgModule({
  declarations: [AppComponent, CalendarComponent],
  imports: [BrowserModule, AppRoutingModule, AppointmentModule, MatIconModule],
  providers: [AppointmentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
