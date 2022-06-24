import { AppointmentsService } from './../appointments.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Appointment';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  public loading: boolean = true;
  public errorMsg: string | undefined;
  public successMsg: string | undefined;
  public appointments: Appointment[] = [];
  public columns = ['appointmentDate', 'name', 'service', 'email', 'cancel'];

  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      }
    );
  }
  cancelAppointment(id: string) {
    this.appointmentService
      .cancelAppointment(id)
      .pipe(mergeMap(() => this.appointmentService.getAppointments()))
      .subscribe(
        (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.successMsg = 'Turno cancelado correctamente';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
