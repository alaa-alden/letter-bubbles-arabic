// Initial Setup
const canvas = document.querySelector('canvas')
const canvasDraw = canvas.getContext('2d')

canvas.width = 2*window.innerWidth/3
canvas.height = 2*window.innerHeight/3
export {
    canvas,
    canvasDraw
}