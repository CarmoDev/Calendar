import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { AllComponent as AllAppointments } from './appointment/all/all.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
  {
    path: 'appointments',
    component: AllAppointments,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
