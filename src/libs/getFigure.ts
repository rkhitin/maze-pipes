import { sample } from 'lodash'

import { PathGround, Figure, FigureType } from '../types'
import { BASE_ANGLES } from '../constants'

const oppositeFigureTypes: FigureType[] = ['T', '+', '|']
const crossFigureTypes: FigureType[] = ['T', '∟', '+']

const getCell = (x: number, y: number, ground: PathGround) => {
  const row = ground[x]
  return row ? row[y] : null
}

const getFigureType = (x: number, y: number, ground: PathGround): FigureType => {
  // Если не путь - рандомный тип
  // TODO: сделать рандом
  if (!ground[x][y]) return '.'

  // left, top, right, bottom
  const neighbours = []
  neighbours[0] = getCell(x, y - 1, ground)
  neighbours[1] = getCell(x - 1, y, ground)
  neighbours[2] = getCell(x, y + 1, ground)
  neighbours[3] = getCell(x + 1, y, ground)

  // Если путь только одна соседняя клетка - это вход, тип "O"
  if (neighbours.filter(Boolean).length === 1) return 'o'

  // Если путь противоположная то "T" или "I" или "+"
  if ((neighbours[0] && neighbours[2]) || (neighbours[1] && neighbours[3])) return sample(oppositeFigureTypes)

  return sample(crossFigureTypes)
}

const getFigure = (x: number, y: number, ground: PathGround): Figure => {
  const type = getFigureType(x, y, ground)
  const angle = sample(BASE_ANGLES)

  return {
    type,
    angle,
  }
}

export default getFigure
