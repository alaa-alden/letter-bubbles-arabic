// Initial Setup
const canvas = document.querySelector('canvas')
const canvasDraw = canvas.getContext('2d')

canvas.width = document.getElementById('e3').offsetWidth
canvas.height = document.getElementById('e3').offsetHeight
export {
    canvas,
    canvasDraw
}