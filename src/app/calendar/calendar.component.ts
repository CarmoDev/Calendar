import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  actualDate: Date = new Date();
  days: Date[] = [];

  ngOnInit(): void {
    this.createCalendar();
  }

  createCalendar() {
    const year = this.actualDate.getFullYear();
    const month = this.actualDate.getMonth();

    const sunday = 0;
    const saturday = 6;

    const initialDate = new Date(year, month, 1);
    while (initialDate.getDay() !== sunday) {
      initialDate.setDate(initialDate.getDate() - 1);
    }

    const finalDate = new Date(year, month + 1, 0);
    while (finalDate.getDay() !== saturday) {
      finalDate.setDate(finalDate.getDate() + 1);
    }

    this.days = [];
    for (
      let date = new Date(initialDate.getTime());
      date <= finalDate;
      date.setDate(date.getDate() + 1)
    ) {
      this.days.push(new Date(date.getTime()));
    }
  }

  changeMonth(offsetMonth: number) {
    this.actualDate.setMonth(this.actualDate.getMonth() + offsetMonth);
    this.actualDate = new Date(this.actualDate.getTime());
    this.createCalendar();
  }
}
