import { generateGround } from './libs'

const ground = generateGround(10, 10)

// console.table(ground)
const cellSize = 40

// function drawRotated(image, ctx) { ctx.save()

//   ctx.translate(40, 100)
//   ctx.rotate(Math.PI / 4)

//   // ctx.drawImage(image, -image.width / 2, -image.height / 2);
//   ctx.fillStyle = 'black'
//   ctx.font = '30px Arial'
//   ctx.textBaseline = 'middle'
//   ctx.textAlign = 'center'
//   ctx.fillText('A', xI * cellSize + cellSize / 2, yI * cellSize - cellSize / 2)

//   ctx.restore()
// }

window.onload = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 400
  canvas.height = 400

  var font, lineHeight, x, y

  x = 100
  y = 0
  font = 20
  lineHeight = 15 // this is guess and check as far as I know
  ctx.font = font + 'px Arial'

  ground.forEach((row, i) => {
    // for (let j = 0; j < 10; j++) {
    // ctx.save()
    // ctx.translate(x, y)
    // ctx.rotate(-Math.PI / 4)
    // ctx.textAlign = 'right'
    // ctx.fillText('right', 0, lineHeight / 2)
    // ctx.restore()
    // ctx.fillStyle = 'red'
    // ctx.fillRect(x, y, 2, 2)
    // x += 50
    // }
  })

  // return

  ground.forEach((row, yI) => {
    row.forEach((cell, xI) => {
      ctx.fillStyle = 'black'
      ctx.font = '30px Arial'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'

      ctx.save()

      ctx.translate(xI * cellSize, yI * cellSize)
      ctx.rotate((180 * Math.PI) / 180)

      // console.log(xI, yI)
      // console.log(xI * cellSize, yI * cellSize + cellSize)
      // ctx.fillRect(cellSize / 2 + 6, -4, 2, 2)
      // ctx.fillRect(xI * 10, yI * 10 + 10 / 2, 10 - 8, 2)
      ctx.fillText('A', cellSize / 2, cellSize / 2)

      ctx.restore()

      // ctx.fillStyle = 'red'
      // ctx.fillRect(x, y, 2, 2)

      // ctx.rotate(1)
      // ctx.fillText('L', xI * cellSize + cellSize, yI * cellSize)
      // ctx.resetTransform()

      ctx.restore()

      // ctx.rotate(-(10 * Math.PI) / 180)
      ctx.fillStyle = cell ? 'white' : 'grey'
      ctx.strokeRect(xI * cellSize, yI * cellSize, cellSize, cellSize)
      // ctx.fillRect(xI * cellSize, yI * cellSize, cellSize, cellSize)
    })
  })

  // ground[ground.length - 1].forEach((cell, xI) => {
  //   ctx.fillStyle = 'black'
  //   ctx.font = '30px Arial'
  //   ctx.textBaseline = 'middle'
  //   ctx.textAlign = 'center'
  //   ctx.fillText('A', xI * cellSize + cellSize / 2, 10 * cellSize - cellSize / 2)
  // })

  // ctx.fillRect(10, 10, 100, 100)
  // ctx.fill()

  // ctx.strokeRect(15, 15, 266, 266)
  // ctx.strokeRect(18, 18, 260, 260)
  // ctx.fillRect(20, 20, 256, 256)

  // for (let i = 0; i < 8; i += 2)
  //   for (let j = 0; j < 8; j += 2) {
  //     ctx.clearRect(20 + i * 32, 20 + j * 32, 32, 32)
  //     ctx.clearRect(20 + (i + 1) * 32, 20 + (j + 1) * 32, 32, 32)
  //   }
}
