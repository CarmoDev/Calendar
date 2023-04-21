import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private myArray: any[] = [];

  constructor() {
    const data = localStorage.getItem('appointments');
    if (data) {
      this.myArray = JSON.parse(data);
    }
  }

  getArray(): any[] {
    return this.myArray;
  }

  setArray(arr: any[]): void {
    this.myArray = arr;
    localStorage.setItem('appointments', JSON.stringify(arr));
  }
}
