import { Neighbour, Ground, PathGround } from '../types'

const getCell = (x: number, y: number, ground: any[][]) => {
  const row = ground[x]
  return row ? row[y] : null
}

const getNeighbours = (x: number, y: number, ground: any[][]): any[] => {
  return [getCell(x, y - 1, ground), getCell(x - 1, y, ground), getCell(x, y + 1, ground), getCell(x + 1, y, ground)]
}

export const getNeighboursForPathGround = (x: number, y: number, ground: PathGround): boolean[] => {
  return getNeighbours(x, y, ground)
}

export const getNeighbouringFigures = (x: number, y: number, ground: Ground): Neighbour[] => {
  const neighbours = getNeighbours(x, y, ground)

  return [
    { position: 'left', figure: neighbours[0], x, y: y - 1 },
    { position: 'top', figure: neighbours[1], x: x - 1, y },
    { position: 'right', figure: neighbours[2], x, y: y + 1 },
    { position: 'bottom', figure: neighbours[3], x: x + 1, y },
  ]
}
