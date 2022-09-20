import {expect, test} from 'vitest'
import { getFutureDate } from '../tests/utils/get-future-date'

import { Appointment } from './appointment'

test('create an appointment', () => {
  const startDate = getFutureDate('2022-08-10')
  const endDate = getFutureDate('2022-08-11')

  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt: startDate,
    endsAt: endDate,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
})

test('cannot create an appointment with end date before start date', () => {
  const startDate = getFutureDate('2022-08-10')
  const endDate = getFutureDate('2022-08-09')

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate,
    })
  }).toThrow()
})

test('cannot create an appointment with start date before now', () => {
  const startDate = new Date()
  const endDate = new Date()

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate,
    })
  }).toThrow()
})
