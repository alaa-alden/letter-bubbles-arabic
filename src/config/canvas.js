// Initial Setup
const canvas = document.querySelector('canvas')
const canvasDraw = canvas.getContext('2d')
// document.getElementById('Game').style.height = (document.getElementById('e3').offsetHeight - document.getElementById('footer').offsetHeight).toString() + 'px'
canvas.width = document.getElementById('Game').clientWidth
canvas.height = document.getElementById('Game').clientHeight
export {
    canvas,
    canvasDraw
}