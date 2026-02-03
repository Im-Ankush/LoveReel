import React from 'react'
import ValentinePage from '../../../components/ValentinePage.jsx'
import { valentineDays } from './valentineWeekConfig.js'

export default function ProposeDay() {
  return <ValentinePage config={valentineDays['propose-day']} />
}
