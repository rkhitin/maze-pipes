import { memoize } from 'lodash'

import { Ground, Figure } from '../types'

import getNeighbours from './getNeighbours'

const getEnterPosition = memoize((ground: Ground) =>
  ground.reduce<[number, number]>(
    (enterPosition, row, i) => {
      if (row[0].shape === 'o') return [i, 0]
      return enterPosition
    },
    [0, 0]
  )
)

const checkIsCellConnected = (figure: Figure) => {}

const getQuarter = (angle: number): number => Math.floor((angle / 90) % 4)

const markConnectedToEnterCell = (ground: Ground) => {
  const [x, y] = getEnterPosition(ground)

  //   const positions = []
  //   positions[0] = [x, y - 1]
  //   positions[1] = [x - 1, y]
  //   positions[2] = [x, y + 1]
  //   positions[3] = [x + 1, y]

  // left, top, right, bottom
  const neighbours = getNeighbours(x, y, ground)
  //   neighbours[0] = ground[x][y - 1]

  for (let i = 0; i < 4; i++) {
    if (!neighbours[i]) continue

    const quarter = getQuarter(neighbours[i].angle)

    if (neighbours[i].shape === '+') {
      neighbours[i].isConnectedToEnter = true
    }

    if (neighbours[i].shape === '|') {
      neighbours[i].isConnectedToEnter =
        i === 0 || i === 2
          ? // for left and right
            quarter === 3 || quarter === 1
          : // for top and botton
            quarter === 2 || quarter === 0
    }

    if (neighbours[i].shape === '∟') {
      console.log(i, quarter)

      neighbours[i].isConnectedToEnter = (() => {
        switch (i) {
          case 0:
            return false
          case 1:
            return quarter === 1 || quarter === 2
          case 2:
            return quarter === 3 || quarter === 2
          case 3:
            return quarter === 3 || quarter === 0
          default:
            return false
        }
      })()
    }
  }

  //   const quarter1 = getQuarter(neighbours[0].angle)
  //   if (neighbours[0] && neighbours[0].shape === 'T' && (quarter1 === 1 || quarter1 === 3)) {
  //     neighbours[0].isConnectedToEnter = true
  //   }

  //   const quarter2 = getQuarter(neighbours[0].angle)
  //   if (neighbours[1] && neighbours[1].shape === 'T' && (quarter2 === 1 || quarter2 === 3)) {
  //     neighbours[1].isConnectedToEnter = true
  //   }

  //   const neighbours = getNeighbours(x, y, ground)

  //   neighbours.forEach(neighbour => {
  //     if (neighbour && neighbour.shape === 'T') {
  //       neighbour.isConnectedToEnter = true
  //     }
  //   })
}

export default markConnectedToEnterCell
