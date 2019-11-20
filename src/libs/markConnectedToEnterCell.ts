import { memoize } from 'lodash'

import { Ground, Figure, Neighbour, NeighbourPosition } from '../types'

import { getNeighbouringFigures } from './groundHelpers'

const getEnterPosition = memoize((ground: Ground) =>
  ground.reduce<[number, number]>(
    (enterPosition, row, i) => {
      if (row[0].shape === 'o') return [i, 0]
      return enterPosition
    },
    [0, 0]
  )
)

const getQuarter = (angle: number): number => Math.floor((angle / 90) % 4)

const horizontalNeighborhood: NeighbourPosition[] = ['left', 'right']

const checkIsFigureConnectedWithX = ({ figure, position }: Neighbour) => {
  if (figure.shape === '+') return true

  const figureQuarter = getQuarter(figure.angle)
  const isFigureOnHorizontalLine = horizontalNeighborhood.includes(position)

  console.log(figure, figureQuarter)

  if (figure.shape === '|') {
    return isFigureOnHorizontalLine
      ? // for left and right
        [3, 1].includes(figureQuarter)
      : // for top and botton
        [2, 0].includes(figureQuarter)
  }

  // if (figure.shape === 'T') {
  //   return isFigureOnHorizontalLine
  //     ? // for left and right
  //       [2, 0].includes(figureQuarter)
  //     : // for top and botton
  //       [3, 1].includes(figureQuarter)
  // }
}

const checkIsNeighbourConnected = (currentFigure: Figure, neighbour: Neighbour): boolean => {
  // const currentFigureQuarter = getQuarter(currentFigure.angle)
  // const targetFigureQuarter = getQuarter(neighbour.figure.angle)

  switch (currentFigure.shape) {
    case '+':
      return false

    case '|':
      return false

    case 'T':
      return false

    case 'o':
      return checkIsFigureConnectedWithX(neighbour)
    // return true

    case 'L':
      return false

    default:
      return false
  }
}
const markConnected = (x: number, y: number, ground: Ground) => {
  const neighbours = getNeighbouringFigures(x, y, ground)

  neighbours.forEach(neighbour => {
    if (!neighbour || !neighbour.figure || neighbour.figure.type === 'activePath') return

    const isFigureConnected = checkIsNeighbourConnected(ground[x][y], neighbour)

    if (!isFigureConnected) return

    neighbour.figure.type = 'activePath'
    markConnected(neighbour.x, neighbour.y, ground)
  })
}

const markConnectedToEnterCell = (ground: Ground) => {
  const [x, y] = getEnterPosition(ground)
  markConnected(x, y, ground)
}

export default markConnectedToEnterCell
