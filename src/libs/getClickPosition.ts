const getClickPosition = (canvas: HTMLCanvasElement, event: MouseEvent): [number, number] => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return [x, y]
}

export default getClickPosition
