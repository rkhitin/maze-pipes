import { sample } from 'lodash'

import { PathGround, Figure, FigureShape } from '../types'
import { BASE_ANGLES } from '../constants'

import { getNeighboursForPathGround } from './groundHelpers'

const oppositeFigureShapes: FigureShape[] = ['T', '+', '|']
const crossFigureShapes: FigureShape[] = ['T', 'L', '+']
const allFigureShapes: FigureShape[] = [...oppositeFigureShapes, ...crossFigureShapes]

const getFigureShape = (x: number, y: number, ground: PathGround): FigureShape => {
  // Если не путь - рандомный тип
  if (!ground[x][y]) return sample(allFigureShapes)

  const neighbours = getNeighboursForPathGround(x, y, ground)

  // Если путь только одна соседняя клетка - это вход, тип "O"
  if (neighbours.filter(Boolean).length === 1) return 'o'

  // Если путь противоположная то "T" или "I" или "+"
  if ((neighbours[0] && neighbours[2]) || (neighbours[1] && neighbours[3])) return sample(oppositeFigureShapes)

  return sample(crossFigureShapes)
}

const getFigure = (x: number, y: number, ground: PathGround): Figure => {
  const shape = getFigureShape(x, y, ground)
  const angle = sample(BASE_ANGLES)
  const type = ground[x][y] ? 'path' : 'default'

  return {
    shape,
    angle,
    type,
  }
}

export default getFigure
