import { canvasDraw } from '../config/canvas'
import {
    distance,
    resolveCollision
} from '../function'

class Letter {
    constructor(x, y, radius, colorCircle,letter,xLetter,yLetter,colorLetter) {
        this.x = x
        this.y = y
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        }
        this.radius = radius
        this.color = colorCircle
        this.mass = 1
        this.letter=letter
        this.xLetter=xLetter
        this.yLetter=yLetter
        this.colorLetter=colorLetter
        this.update = this.update.bind(this)
        this.draw = this.draw.bind(this)

    }
    update(Letters) {
        this.draw()
        for (let i = 0; i < Letters.length; i++) {
            if (this === Letters[i]) continue
            if (distance(this.x, this.y, Letters[i].x, Letters[i].y) - this.radius * 2 < 0)
                resolveCollision(this, Letters[i])
        }
        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth)
            this.velocity.x = -this.velocity.x
        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight)
            this.velocity.y = -this.velocity.y
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.xLetter += this.velocity.x
        this.yLetter += this.velocity.y
    }
    draw() {
        canvasDraw.beginPath()
        canvasDraw.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasDraw.fillStyle = this.color
        canvasDraw.fill()
        canvasDraw.strokeStyle = this.color
        canvasDraw.stroke()
        canvasDraw.closePath()
        canvasDraw.font = '40px arial'
        canvasDraw.textAlign = "center";
        canvasDraw.fillStyle=this.colorLetter
        canvasDraw.fillText(this.letter,this.xLetter,this.yLetter)
    }
}
export default Letter
