import React from 'react'
import ValentinePage from '../../../components/ValentinePage.jsx'
import { valentineDays } from './valentineWeekConfig.js'

export default function RoseDay() {
  return <ValentinePage config={valentineDays['rose-day']} />
}
