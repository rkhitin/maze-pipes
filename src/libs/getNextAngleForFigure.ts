import { Figure } from '../types'
import { BASE_ANGLES } from '../constants'

const getNextAngleForFigure = (figure: Figure) => {
  return figure.angle + 90
  // const currentAngleIndex = BASE_ANGLES.indexOf(figure.angle)

  // return currentAngleIndex === BASE_ANGLES.length - 2 ? BASE_ANGLES[0] : BASE_ANGLES[currentAngleIndex + 1]
}

export default getNextAngleForFigure
