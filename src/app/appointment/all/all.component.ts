import { AppointmentService } from 'src/app/services/appointments.service';
import { Component, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  constructor(public appointmentService: AppointmentService) {}

  allAppointments: any[] = [];
  appointmentsByDate: { [key: string]: any[] } = {};

  ngOnInit(): void {
    this.allAppointments = this.appointmentService.getArray();
    this.groupAppointmentsByDate();
  }

  groupAppointmentsByDate(): void {
    this.appointmentsByDate = {};

    for (const appointment of this.allAppointments) {
      const date = new Date(appointment.Date).toLocaleDateString();

      if (!this.appointmentsByDate[date]) {
        this.appointmentsByDate[date] = [];
      }

      this.appointmentsByDate[date].push(appointment);
    }
  }

  getDates(): string[] {
    return Object.keys(this.appointmentsByDate);
  }

  deleteAppointment(appointment: any): void {
    const index = this.allAppointments.findIndex(
      (appoint) =>
        appoint.Date === appointment.Date && appoint.Name === appointment.Name
    );

    if (index !== -1) {
      this.allAppointments.splice(index, 1);
      this.appointmentService.setArray(this.allAppointments);
      this.groupAppointmentsByDate();
    }

    console.log('allAppointments atualizado:', this.allAppointments);
  }

  onDrop(event: CdkDragDrop<any>, date: string): void {
    // Verifica se a lista de origem e de destino estão definidas
    const sourceList = this.appointmentsByDate[event.previousContainer.data];
    const destinationList = this.appointmentsByDate[date];
    if (
      typeof sourceList === 'undefined' ||
      typeof destinationList === 'undefined'
    ) {
      console.error('Lista de origem ou destino não definida');
      return;
    }

    // Obtém o item arrastado
    const draggedItem = sourceList[event.previousIndex];

    // Remove o item da lista original
    sourceList.splice(event.previousIndex, 1);

    // Adiciona o item na lista de destino
    destinationList.splice(event.currentIndex, 0, draggedItem);

    // Atualiza o array allAppointments
    this.allAppointments = ([] as any[]).concat(
      ...Object.values(this.appointmentsByDate)
    );
  }
}
