import React from 'react'
import ValentinePage from '../../../components/ValentinePage.jsx'
import { valentineDays } from './valentineWeekConfig.js'

export default function TeddyDay() {
  return <ValentinePage config={valentineDays['teddy-day']} />
}
