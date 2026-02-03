import React from 'react'
import ValentinePage from '../../../components/ValentinePage.jsx'
import { valentineDays } from './valentineWeekConfig.js'

export default function PromiseDay() {
  return <ValentinePage config={valentineDays['promise-day']} />
}
