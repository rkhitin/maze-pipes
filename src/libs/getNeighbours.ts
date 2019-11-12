const getCell = (x: number, y: number, ground: any[][]) => {
  const row = ground[x]
  return row ? row[y] : null
}

const getNeighbours = (x: number, y: number, ground: any[][]) => {
  // left, top, right, bottom
  const neighbours = []
  neighbours[0] = getCell(x, y - 1, ground)
  neighbours[1] = getCell(x - 1, y, ground)
  neighbours[2] = getCell(x, y + 1, ground)
  neighbours[3] = getCell(x + 1, y, ground)

  return neighbours
}

export default getNeighbours
