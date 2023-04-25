import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AppointmentService } from 'src/app/services/appointments.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit, OnDestroy {
  constructor(
    public modal: ModalService,
    private appointmentService: AppointmentService
  ) {}

  Allappointments: {}[] = [];

  ngOnInit(): void {
    this.modal.register('appointment');
    this.Allappointments = this.appointmentService.getArray();
  }

  ngOnDestroy(): void {
    this.modal.unregister('appointment');
  }

  date = new FormControl('');
  name = new FormControl('');
  hour = new FormControl('');

  appointmentForm = new FormGroup({
    date: this.date,
    name: this.name,
    hour: this.hour,
  });

  formatDate(selectedDate: string | null): string {
    const parts = selectedDate!.split('-');
    const month = parts[1];
    const day = parts[2];

    return `${day}.${month}`;
  }

  formatHour(selectedHour: string | null): string {
    const hourAndMinute = selectedHour!.split(':');

    const hour = hourAndMinute[0];

    return hour;
  }

  onSubmit() {
    const dateValue: string | null = this.formatDate(
      this.appointmentForm.get('date')!.value
    );
    const nameValue: string | null = this.appointmentForm.get('name')!.value;
    const hourValue: string | null = this.formatHour(
      this.appointmentForm.get('hour')!.value
    );

    this.Allappointments.push({
      Date: dateValue,
      Name: nameValue,
      Hour: hourValue,
    });

    this.appointmentService.setArray(this.Allappointments);
  }
}
