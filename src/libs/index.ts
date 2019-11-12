import { Figure } from '../types'
import { ROTATION_STEP } from '../constants'

import generateGround from './generateGround'
import getFigure from './getFigure'

const getAngleStep = (currentAngle: number, targetAngle: number) => {
  return currentAngle < targetAngle - ROTATION_STEP ? ROTATION_STEP : targetAngle - currentAngle
}

const getNextAngleForFigure = (figure: Figure) => {
  return figure.angle + 90
}

const getClickPosition = (canvas: HTMLCanvasElement, event: MouseEvent): [number, number] => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return [x, y]
}

export { generateGround, getFigure, getNextAngleForFigure, getClickPosition, getAngleStep }
