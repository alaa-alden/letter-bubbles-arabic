// Initial Setup
const canvas = document.querySelector('canvas')
const canvasDraw = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
export {
    canvas,
    canvasDraw
}