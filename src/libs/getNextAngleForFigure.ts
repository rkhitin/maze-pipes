import { Figure } from '../types'

const getNextAngleForFigure = (figure: Figure) => {
  return figure.angle + 90
}

export default getNextAngleForFigure
