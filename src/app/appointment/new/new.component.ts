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

  date = new FormControl(new Date());
  name = new FormControl('');

  appointmentForm = new FormGroup({
    date: this.date,
    name: this.name,
  });

  onSubmit() {
    const dateValue: Date | null = this.appointmentForm.get('date')!.value;
    const nameValue: string | null = this.appointmentForm.get('name')!.value;

    this.Allappointments.push({
      Date: dateValue,
      Name: nameValue,
    });

    this.appointmentService.setArray(this.Allappointments);
  }
}
