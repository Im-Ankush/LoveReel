import React from 'react'
import ValentinePage from '../../../components/ValentinePage.jsx'
import { valentineDays } from './valentineWeekConfig.js'

export default function KissDay() {
  return <ValentinePage config={valentineDays['kiss-day']} />
}
