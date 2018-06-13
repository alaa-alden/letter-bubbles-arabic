/* eslint no-console:0 */
import { randomIntFromRange, distance, randomIndex } from './function'
import Letter from './class/letter'
import { canvas, canvasDraw } from './config/canvas'

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})
addEventListener('keydown', function (event) {
    console.log(event)
    for(let i in  letters){
        if(event.key==letters[i].letter)
            letters.splice(i,1) 
    }
})
// Implementation
let
    chars = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ا', 'إ', 'آ', 'ؤ', 'ئ', 'ء'],
    idxy = [15, 8, 8, 8, 5, 5, 5, 10, 10, 5, 5, 5, 5, 5, 5, 10, 10, 5, 5, 10, 5, 13, 10, 5, 5, 5, 5, 5, 15, 15, 15, 5, 5, 10]
let letters
function init() {
    letters = []

    for (let i = 0; i < 40; i++) {
        let radius = 30,
            x = randomIntFromRange(radius, canvas.width - radius),
            y = randomIntFromRange(radius, canvas.height - radius),
            indexColor = randomIndex(colors),
            indexChar=randomIndex(chars),
            ychar = idxy[indexChar]
        if (i !== 0) {
            for (let j = 0; j < letters.length; j++) {
                if (distance(x, y, letters[j].x, letters[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius),
                    y = randomIntFromRange(radius, canvas.height - radius),
                    j = -1
                }
            }
        }
        letters.push(new Letter(x, y, radius, colors[indexColor],chars[indexChar],x,y+ychar,'black'))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    canvasDraw.clearRect(0, 0, canvas.width, canvas.height)
    letters.forEach(letter => {
        letter.update(letters)
    })
}

init()
animate()
