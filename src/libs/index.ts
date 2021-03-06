import { Figure } from '../types'
import { ROTATION_STEP } from '../constants'

import generatePathGround from './generatePathGround'
import getFigure from './getFigure'
import markConnectedToEnterCell from './markConnectedToEnterCell'

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

export {
  generatePathGround,
  getFigure,
  getNextAngleForFigure,
  getClickPosition,
  getAngleStep,
  markConnectedToEnterCell,
}
