// Initial Setup
const canvas = document.querySelector('canvas')
const canvasDraw = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

export {
    canvas,
    canvasDraw
}