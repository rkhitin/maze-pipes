import { generateGround, getFigure, getNextAngleForFigure } from './libs'
import { Figure, Ground } from './types'

let clickedCell = [null, null]
let nextAngleForFigure = null

const NUMBER_OF_CELL_ON_GROUND = 10
const CELL_SIZE = 40

const groundWidth = NUMBER_OF_CELL_ON_GROUND * CELL_SIZE + 1
const groundHeight = NUMBER_OF_CELL_ON_GROUND * CELL_SIZE + 1

// Генерируем площадку с путем
const pathGround = generateGround(NUMBER_OF_CELL_ON_GROUND, NUMBER_OF_CELL_ON_GROUND)
// Заполняем площадку фигурами
const ground: Ground = pathGround.map((row, y) => row.map((cell, x) => getFigure(x, y, pathGround)))

const drawFigure = (x: number, y: number, figure: Figure, ctx: CanvasRenderingContext2D) => {
  ctx.save()

  const xPoint = CELL_SIZE * x + CELL_SIZE / 2
  const yPoint = CELL_SIZE * y + CELL_SIZE / 2

  ctx.translate(xPoint, yPoint)
  ctx.rotate((figure.angle * Math.PI) / 180)
  ctx.translate(-xPoint, -yPoint)

  ctx.fillText(figure.type, xPoint, yPoint)
  ctx.restore()
}

const getClickPosition = (canvas: HTMLCanvasElement, event: MouseEvent): [number, number] => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return [x, y]
}

const drowBaseGround = (ctx: CanvasRenderingContext2D) => {
  ground.forEach((row, yI) => {
    row.forEach((figure, xI) => {
      ctx.fillStyle = 'black'
      ctx.font = '20px Arial'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'

      drawFigure(xI, yI, figure, ctx)

      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.strokeRect(xI * CELL_SIZE + 0.5, yI * CELL_SIZE + 0.5, CELL_SIZE, CELL_SIZE)
    })
  })
}

window.onload = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas')
  const animationCanvas = <HTMLCanvasElement>document.getElementById('animation-canvas')

  animationCanvas.addEventListener('mousedown', event => {
    if (clickedCell[0] !== null) return

    const [x, y] = getClickPosition(canvas, event)
    const xCellNumber = Math.floor(x / CELL_SIZE)
    const yCellNumber = Math.floor(y / CELL_SIZE)

    clickedCell[0] = xCellNumber
    clickedCell[1] = yCellNumber

    const currentFigure = ground[yCellNumber][xCellNumber]
    nextAngleForFigure = getNextAngleForFigure(currentFigure)
  })

  const ctx = canvas.getContext('2d')
  const aCtx = animationCanvas.getContext('2d')

  canvas.width = groundWidth
  canvas.height = groundHeight
  animationCanvas.width = groundWidth
  animationCanvas.height = groundHeight

  const step = () => {
    window.requestAnimationFrame(step)

    if (clickedCell[0] === null) return

    const [x, y] = clickedCell
    const currentFigure = ground[y][x]

    if (nextAngleForFigure) {
      if (currentFigure.angle < nextAngleForFigure) {
        currentFigure.angle += 2
      } else {
        nextAngleForFigure = null
        clickedCell = [null, null]

        // ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height)
        ctx.clearRect(x * CELL_SIZE + 1.5, y * CELL_SIZE + 1.5, CELL_SIZE - 2, CELL_SIZE - 2)
        drowBaseGround(ctx)

        aCtx.clearRect(0, 0, animationCanvas.width, animationCanvas.height)
        return
      }
    }

    aCtx.fillStyle = 'white'
    aCtx.fillRect(x * CELL_SIZE + 1.5, y * CELL_SIZE + 1.5, CELL_SIZE - 2, CELL_SIZE - 2)

    aCtx.fillStyle = 'red'
    aCtx.font = '20px Arial'
    aCtx.textBaseline = 'middle'
    aCtx.textAlign = 'center'

    drawFigure(x, y, currentFigure, aCtx)
  }

  window.requestAnimationFrame(step)

  drowBaseGround(ctx)
}
