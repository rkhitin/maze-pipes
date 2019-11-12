export type FigureShape = 'o' | 'T' | '∟' | '+' | '|' | '.'

export type FigureType = 'activePath' | 'path' | 'default'

export type Figure = {
  shape: FigureShape
  type: FigureType
  angle: number
  isConnectedToEnter?: boolean
}

// Игровая площадка с путем, true - путь, false - стена
export type PathGround = boolean[][]

// Игровая площадка с фигурами, true - путь, false - стена
export type Ground = Figure[][]

export type UserClickEvent = {
  nextAngleForFigure: null | number
  cellPosition: [null | number, null | number]
}
