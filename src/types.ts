export type FigureType = 'o' | 'T' | '∟' | '+' | '|' | '.'

export type Figure = {
  type: FigureType
  angle: number
}

// Игровая площадка с путем, true - путь, false - стена
export type PathGround = boolean[][]

// Игровая площадка с фигурами, true - путь, false - стена
export type Ground = Figure[][]
