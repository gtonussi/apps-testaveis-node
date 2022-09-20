import {describe, expect, it} from 'vitest'
import { Appointment } from '../entities/appointment'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'
import { getFutureDate } from '../tests/utils/get-future-date'
import { CreateAppointment } from './create-appointment'

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository()

    const sut = new CreateAppointment(appointmentsRepository)
    // sut: system under test
  
    const startDate = getFutureDate('2022-08-10')
    const endDate = getFutureDate('2022-08-11')

    expect(sut.execute({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate,
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create an appointment with overlapping dates', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const sut = new CreateAppointment(appointmentsRepository)
  
    const startDate = getFutureDate('2022-08-10')
    const endDate = getFutureDate('2022-08-15')

    await sut.execute({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate,
    })
    
    expect(sut.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18'),
    })).rejects.toBeInstanceOf(Error)
    
    expect(sut.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-12'),
    })).rejects.toBeInstanceOf(Error)
    
    expect(sut.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-17'),
    })).rejects.toBeInstanceOf(Error)
    
    expect(sut.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-08-11'),
      endsAt: getFutureDate('2022-08-12'),
    })).rejects.toBeInstanceOf(Error)
  })
})