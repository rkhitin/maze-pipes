import { Ground, Figure } from './types'
import { CELL_SIZE } from './constants'

export const drawFigure = (x: number, y: number, figure: Figure, ctx: CanvasRenderingContext2D) => {
  ctx.save()

  const xPoint = CELL_SIZE * x + CELL_SIZE / 2
  const yPoint = CELL_SIZE * y + CELL_SIZE / 2

  ctx.translate(xPoint, yPoint)
  ctx.rotate((figure.angle * Math.PI) / 180)
  ctx.translate(-xPoint, -yPoint)

  ctx.fillStyle = figure.type === 'default' ? 'black' : 'red'
  ctx.font = '20px Arial'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  ctx.fillText(figure.shape, xPoint, yPoint)
  ctx.restore()
}

export const drawGround = (ground: Ground, ctx: CanvasRenderingContext2D) => {
  ground.forEach((row, yI) => {
    row.forEach((figure, xI) => {
      drawFigure(xI, yI, figure, ctx)

      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.strokeRect(xI * CELL_SIZE + 0.5, yI * CELL_SIZE + 0.5, CELL_SIZE, CELL_SIZE)
    })
  })
}

export const drawAnimationFigureBackground = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = 'white'
  ctx.fillRect(x * CELL_SIZE + 1.5, y * CELL_SIZE + 1.5, CELL_SIZE - 2, CELL_SIZE - 2)
}
