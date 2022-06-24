import { AppointmentsService } from './../appointments.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  public successMsg: string = '';
  public errorMsg: string = '';
  public appointmentDate: string = '';
  public name: string = '';
  public service: string = '';
  public email: string = '';

  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit(): void {}

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService
      .createAppointment(
        this.appointmentDate,
        this.name,
        this.service,
        this.email
      )
      .subscribe(
        (createdAppointment: Appointment) => {
          this.appointmentDate = '';
          this.name = '';
          this.service = '';
          this.email = '';
          const appointmentDate = new Date(
            createdAppointment.appointmentDate
          ).toDateString();
          this.successMsg = `Turno asignado correctamente para el ${appointmentDate}`;
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
