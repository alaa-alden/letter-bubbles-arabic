/* eslint no-console:0 */

import {
    canvasDraw,
    canvas
} from '../config/canvas'

class Letter {
    constructor(time, show, velocity, x, y, radius, colorCircle, letter, xLetter, yLetter, colorLetter) {
        this.time = time
        this.show = show
        this.x = x
        this.y = y
        this.velocity = velocity
        this.radius = radius
        this.colorCircle = colorCircle
        this.mass = 1
        this.letter = letter
        this.xLetter = xLetter
        this.yLetter = yLetter
        this.colorLetter = colorLetter
        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)

    }
    update(Radius) {
        // for change size when change screen's size
        if(this.time)
        this.radius = Radius +(this.time*Radius/120)// big letter when caught it
        else this.radius=Radius
        // check if letter arrive top or down screen 
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height)
            this.velocity.y = -this.velocity.y
        // change coordinate for circle center
        this.x += this.velocity.x
        this.y += this.velocity.y
        // change coordinate for letter
        this.xLetter += this.velocity.x
        this.yLetter += this.velocity.y
        // redraw letter
        this.draw()

    }
    draw() {
        // draw circle 
        canvasDraw.beginPath()
        canvasDraw.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasDraw.fillStyle = this.colorCircle
        canvasDraw.fill()
        canvasDraw.closePath()
        // draw letter inside circle
        canvasDraw.font = `${(canvas.height+canvas.width)/45}px arial`
        canvasDraw.textAlign = 'center'
        canvasDraw.fillStyle = this.colorLetter
        canvasDraw.fillText(this.letter, this.xLetter, this.yLetter)
    }
}
export default Letter