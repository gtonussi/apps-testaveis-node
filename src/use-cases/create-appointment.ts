import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  constructor (
    private appointmentsRepository: AppointmentsRepository
  ) {}

  async execute(request: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overLappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
      request.startsAt,
      request.endsAt
    )

    if (overLappingAppointment) {
      throw new Error ('Another appointment overlaps this appointment dates')
    }

    const appointment = new Appointment({
      customer: request.customer,
      startsAt: request.startsAt,
      endsAt: request.endsAt,
    })

    await this.appointmentsRepository.create(appointment)

    return appointment
  }
}