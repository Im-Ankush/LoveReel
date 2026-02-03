import React from 'react'
import ValentinePage from '../../../components/ValentinePage.jsx'
import { valentineDays } from './valentineWeekConfig.js'

export default function HugDay() {
  return <ValentinePage config={valentineDays['hug-day']} />
}
