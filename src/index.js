/* eslint no-console:0 */
import {
    randomIntFromRange,
    distance,
    randomIndex
} from './function'
import Letter from './class/letter'
import {
    canvas,
    canvasDraw
} from './config/canvas'
let
    chars = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ا', 'إ', 'آ', 'ؤ', 'ئ', 'ء'],
    idxy = [15, 8, 8, 8, 5, 5, 5, 10, 10, 5, 5, 5, 5, 5, 5, 10, 10, 5, 5, 10, 5, 13, 10, 5, 5, 5, 5, 5, 15, 15, 15, 5, 5, 10],
    letters, numberletters = 0,
    CounterError = 0,
    CounterLeft = 0,
    speed = 5,
    devspeed = 0.5,
    MaxNumberLetter = 15,
    step,
    win = true
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame


// may we don't need this
// update size when change size of window
addEventListener('resize', () => {
    canvas.width = 2 * innerWidth / 3
    canvas.height = 2 * innerHeight / 3
    //init()
})
// check if key is same any letter on scaner for delete
addEventListener('keydown', function (event) {
    // console.log(event)
    let check = false
    for (let i in letters) {
        if (event.key == letters[i].letter) {
            letters[i].colorCircle = '#F01A30'
            check = true
        }
    }
    if (!check) CounterError++

})
// Implementation

function init() {
    letters = []
    // call animaltion letter
    animate()

}
// Animation Loop , this animation letter by update fun of letters
function animate() {
    // clear canvas for new draw,when update coordinate letters or not show some letters
    canvasDraw.clearRect(0, 0, canvas.width, canvas.height)
    if (numberletters == MaxNumberLetter) { //win
        clearInterval(createLetter)
        win = true
        // check if create all letters and all letters caught
        letters.forEach((letter) => {
            if (letter.show && letter.colorCircle == '#00A5FF') win = false
        })
        if (win) {
            canvasDraw.font = '40px arial',
            canvasDraw.textAlign = 'center',
            canvasDraw.fillText('you have won in our Game', canvas.width / 2, canvas.height / 2)
            cancelAnimationFrame(step)
            return 0
        }
    }

    if (CounterLeft == 5) { // check if five letters arrive to canvas's left wihtout catching them
        canvasDraw.font = '40px arial',
        canvasDraw.textAlign = 'center',
        canvasDraw.fillText('good luck in the future', canvas.width / 2, canvas.height / 2)
        cancelAnimationFrame(step)
        clearInterval(createLetter)
    } else {
        //else coutinue with Game
        letters.forEach(letter => {
            // check if letter arrive to scanner left
            if (letter.show // letter include canvas
                &&
                letter.colorCircle == '#00A5FF' // not catch
                &&
                letter.x - letter.radius < 0 //arrive left 
            ) {
                CounterLeft++
                letter.show = false
            }

            //update or  catch one of letters , start it big then not show 
            if (letter.show) {
                if (letter.colorCircle == '#F01A30')
                    letter.old++, letter.radius += 0.5
                if (letter.old == 25)
                    letter.show = false
                else
                    letter.update()
            }
        })
    }
    document.getElementById('Countererror').innerHTML = CounterError
    document.getElementById('Counterleft').innerHTML = 5 - CounterLeft
    step = requestAnimationFrame(animate)
}
// create letter each 1 second
var createLetter = setInterval(() => {
    // creater properties for new letter
    let velocity = {
            x: -(Math.abs((Math.random() - 0.5) * speed)),
            y: (Math.random() - 0.5) * 5
        } //for speed letter
        ,
        radius = 30,
        x = canvas.width + 10,
        y = randomIntFromRange(radius, canvas.height - radius),
        // indexColor = randomIndex(colors),
        indexChar = randomIndex(chars),
        ychar = idxy[indexChar]
    numberletters++
    letters.push(new Letter(0, true, velocity, x, y, radius, '#00A5FF', chars[indexChar], x, y + ychar, '#FCFFF5'))
    // increase speed for next letter
    if (speed < 15)
        speed += devspeed
    else { //speed arrive 15 so decrease devspeed
        devspeed = 0.1
    }
}, 1000)
//  call initialization function
init()