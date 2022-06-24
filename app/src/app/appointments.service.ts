import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './Appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.BASE_URL}/appointments`);
  }

  createAppointment(
    appointmentDate: string,
    name: string,
    service: string,
    email: string
  ): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, {
      appointmentDate,
      name,
      service,
      email,
    });
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/appointments/${id}`);
  }
}
