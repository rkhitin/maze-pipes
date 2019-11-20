import {
  generatePathGround,
  getFigure,
  getNextAngleForFigure,
  getClickPosition,
  getAngleStep,
  markConnectedToEnterCell,
} from './libs'
import { NUMBER_OF_CELL_ON_GROUND, CELL_SIZE, BASE_ANGLES } from './constants'
import { drawFigure, drawGround, drawAnimationFigureBackground } from './canvasLibs'
import { UserClickEvent, Ground } from './types'

const userClickEventsStack: UserClickEvent[] = []
const groundWidth = NUMBER_OF_CELL_ON_GROUND * CELL_SIZE + 1
const groundHeight = NUMBER_OF_CELL_ON_GROUND * CELL_SIZE + 1

// Генерируем площадку с путем
const pathGround = generatePathGround(NUMBER_OF_CELL_ON_GROUND, NUMBER_OF_CELL_ON_GROUND)
// Заполняем площадку фигурами
const ground: Ground = pathGround.map((row, y) => row.map((cell, x) => getFigure(x, y, pathGround)))

const onClickHandler = (canvas: HTMLCanvasElement, event: MouseEvent) => {
  const [x, y] = getClickPosition(canvas, event)
  const xCellNumber = Math.floor(x / CELL_SIZE)
  const yCellNumber = Math.floor(y / CELL_SIZE)

  const currentFigure = ground[yCellNumber][xCellNumber]

  userClickEventsStack.unshift({
    cellPosition: [xCellNumber, yCellNumber],
    nextAngleForFigure: getNextAngleForFigure(currentFigure),
  })
}

window.onload = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas')
  const animationCanvas = <HTMLCanvasElement>document.getElementById('animation-canvas')

  animationCanvas.addEventListener('mousedown', onClickHandler.bind(null, canvas))

  const ctx = canvas.getContext('2d')
  const aCtx = animationCanvas.getContext('2d')

  canvas.width = groundWidth
  canvas.height = groundHeight
  animationCanvas.width = groundWidth
  animationCanvas.height = groundHeight

  const step = () => {
    window.requestAnimationFrame(step)

    if (userClickEventsStack.length === 0) return

    for (let i = 0; i < userClickEventsStack.length; i++) {
      const userClickEvent = userClickEventsStack[i]
      const [x, y] = userClickEvent.cellPosition
      const currentFigure = ground[y][x]

      if (currentFigure.angle < userClickEvent.nextAngleForFigure) {
        currentFigure.angle += getAngleStep(currentFigure.angle, userClickEvent.nextAngleForFigure)

        drawAnimationFigureBackground(x, y, aCtx)
        drawFigure(x, y, currentFigure, aCtx)

        continue
      }

      // Конец анимации для данного эвентa
      markConnectedToEnterCell(ground)
      userClickEventsStack.splice(i, 1)
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    aCtx.clearRect(0, 0, animationCanvas.width, animationCanvas.height)

    drawGround(ground, ctx)
  }

  window.requestAnimationFrame(step)

  drawGround(ground, ctx)
}
