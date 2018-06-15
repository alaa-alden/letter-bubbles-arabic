/* eslint no-console:0 */

import {
    canvasDraw,
    canvas
} from '../config/canvas'
/*import {
    distance,
    resolveCollision
} from '../function'
*/
class Letter {
    constructor(old,show, velocity, x, y, radius, colorCircle, letter, xLetter, yLetter, colorLetter) {
        this.old=old
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
    update(Letters) {

        /*// for collision
        for (let i = 0; i < Letters.length; i++) {
            if (this === Letters[i]) continue
            if (distance(this.x, this.y, Letters[i].x, Letters[i].y) - this.radius * 2 < 0)
                resolveCollision(this, Letters[i])
        }*/
        // if letter arrive to scanner left
        if (this.x - this.radius < 0 || this.x - this.radius > canvas.width+10) {
            /*let l = 0,
                r = Letters.length,
                mid
            while (l <= r) {
                mid = l + r >> 1
                if (Letters[mid].id < this.id) l = mid + 1
                else if (Letters[mid].id > this.id) r = mid - 1
                else if (Letters[mid].id == this.id) {
                    Letters.splice(mid, 1)
                    console.log("when delete left/far right " + Letters.length)
                }
            }*/
            // Letters.splice(index, 1)
            this.show=false
            if (this.colorCircle == '#71DDE3')
                console.log('when delete left/far right ' + Letters.length)
        }
        // this.velocity.x = -this.velocity.x
        else if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height)
            this.velocity.y = -this.velocity.y
        // change coordinate for circle center
        this.x += this.velocity.x
        this.y += this.velocity.y
        // change coordinate for letter
        this.xLetter += this.velocity.x
        this.yLetter += this.velocity.y
        this.draw()

    }
    draw() {
        canvasDraw.beginPath()
        canvasDraw.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasDraw.fillStyle = this.colorCircle
        canvasDraw.fill()
        canvasDraw.strokeStyle = this.colorCircle
        canvasDraw.stroke()
        canvasDraw.closePath()
        canvasDraw.font = '40px arial'
        canvasDraw.textAlign = 'center'
        canvasDraw.fillStyle = this.colorLetter
        canvasDraw.fillText(this.letter, this.xLetter, this.yLetter)
    }
}
export default Letter