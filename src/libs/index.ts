import { ROTATION_STEP } from '../constants'

import generateGround from './generateGround'
import getFigure from './getFigure'
import getNextAngleForFigure from './getNextAngleForFigure'
import getClickPosition from './getClickPosition'

const getAngleStep = (currentAngle: number, targetAngle: number) => {
  return currentAngle < targetAngle - ROTATION_STEP ? ROTATION_STEP : targetAngle - currentAngle
}

export { generateGround, getFigure, getNextAngleForFigure, getClickPosition, getAngleStep }
