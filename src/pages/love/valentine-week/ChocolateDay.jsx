import React from 'react'
import ValentinePage from '../../../components/ValentinePage.jsx'
import { valentineDays } from './valentineWeekConfig.js'

export default function ChocolateDay() {
  return <ValentinePage config={valentineDays['chocolate-day']} />
}
