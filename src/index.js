/* eslint no-console:0 */
import {
    randomIntFromRange,
    randomIndex,
    distance,

} from './function'
import Letter from './class/letter'
import {
    canvas,
    canvasDraw
} from './config/canvas'
import IntervalTimer from './class/IntervalTimer'
let
    chars = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ا', 'إ', 'آ', 'ؤ', 'ئ', 'ء'],
    IY = [25, 15, 15, 15, 5, 5, 8, 15, 20, 8, 10, 12, 15, 10, 10, 20, 20, 8, 10, 20, 12, 18, 17, 5, 10, 15, 8, 8, 15, 15, 20, 8, 10, 10],
    DX = [0, 3, 2, 2, -1, -1, -1, 3, 3, 5, 5, 2, 2, 2, 2, 0, 0, -2, -2, 3, 3, 3, 3, 2, 3, 0, 3, 0, 0, 0, 0, 2, 0, 0],
    letters, Counterletters = 0,
    CounterError = 0,
    CounterLeft = 0,
    speed = 3,
    devspeed = 0.5,
    MaxNumberLetter = 50,
    step,
    win = true,
    colorLive = '#0999e8',
    colorDead = '#F01A30'
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame



// update size when change size of window
addEventListener('resize', () => {
    document.getElementById('container').style.height = $(window).innerHeight().toString() + 'px';
    canvas.width = document.getElementById('Game').clientWidth
    canvas.height = document.getElementById('Game').clientHeight
})

// check if key is same  any letter in screen
addEventListener('keydown', function (event) {
    let check = false
    for (let i in letters) {
        if (event.key == letters[i].letter && letters[i].show) {
            letters[i].colorCircle = colorDead // dead letter when catch
            check = true
        }
    }
    // if the compressed key is not inside screen 
    if (!check) CounterError++

})
let go = false
// function initialization the game
function init() {
    // set height for container whole page and onle specify page
    document.getElementById('container').style.height = $(window).innerHeight().toString() + 'px';
    // initialization letters as array
    letters = []
    // call animaltion letter
    processGame()
    window.onblur = function () {
        // stop create letter
        createLetter.pause()
        // stop redraw gaem space
        cancelAnimationFrame(step)
        go = true;
    }
}
window.onfocus = () => {
    if (go) {
        requestAnimationFrame(processGame)
        createLetter.resume()
        go = false
    }
}
// Animation Loop , this animation letter by update fun of letters
function processGame() {
    // clear canvas for new draw,when update coordinate letters or not show some letters
    canvasDraw.clearRect(0, 0, canvas.width, canvas.height)
    if (Counterletters == MaxNumberLetter) { //win
        clearInterval(createLetter)
        win = true
        // check if create all letters and all letters caught
        letters.forEach((letter) => {
            if (letter.show && letter.colorCircle == colorLive || letter.time < 25) win = false
        })
        if (win) {
            canvasDraw.font = `${(canvas.height + canvas.width) / 30}px arial`
            canvasDraw.textAlign = 'center'
            canvasDraw.fillStyle = 'black'
            canvasDraw.fillText('you have won in our Game', canvas.width / 2, canvas.height / 2)
            // stop create letter
            createLetter.pause()
            // stop redraw game space
            cancelAnimationFrame(step)
            return 0
        }
    }
    // check if five letters arrive to canvas's left wihtout catching them
    if (CounterLeft >= 5) {
        // write lose phrase 
        canvasDraw.font = `${(canvas.height + canvas.width) / 30}px arial`
        canvasDraw.textAlign = 'center'
        canvasDraw.fillStyle = 'black'
        canvasDraw.fillText('good luck in the future', canvas.width / 2, canvas.height / 2)
        // stop create letter 
        createLetter.pause()
        // stop redraw gaem space
        cancelAnimationFrame(step)
    }
    //else coutinue with Game
    else {
        // update radius letters for change size screen ,.....
        let radius = (canvas.height + canvas.width) / 60
        // press in letters
        letters.forEach(letter => {
            //update or  catch one of letters , start it big then not show 
            if (letter.show) {
                // check if letter arrive to scanner left
                if (letter.show // letter is live and it without caught 
                    &&
                    letter.colorCircle == colorLive // not catch
                    &&
                    letter.x - letter.radius < 0 //arrive left 
                ) {
                    CounterLeft++ // increase counter
                    letter.show = false//hide the letter
                }
                // process when letter dead
                if (letter.colorCircle == colorDead) {
                    letter.time++//change time to death
                }

                if (letter.time == 25) // it's time to death
                    letter.show = false
                else // except update the letter -it's maybe live or about to die- ,and  press radius for chang size
                    letter.update(radius)
            }
        })
    }
    // counter error and counter are update in screen 
    document.getElementById('Countererror').innerHTML = CounterError
    document.getElementById('Counterleft').innerHTML = 5 - CounterLeft
    // call function is responsible for call processGame 60 times per second
    step = requestAnimationFrame(processGame)
}
let createLetterPerSecond = 1
// create letter each 1 second
var createLetter = new IntervalTimer(() => {
    let EndLetter = Counterletters//for not check whole letters if they are same y-coordinate , only new letters and they have same x-coordinate 
    for (let i = 0; i < createLetterPerSecond; i++) {
        // creater properties for new letter
        let velocity = {
            x: -speed,
            y: (Math.random() - 0.5) * 3
        }// specify speed letter in game space
            , radius = (canvas.height + canvas.width) / 60
            , x = randomIntFromRange(canvas.width + 10, canvas.width + 100)
            , y = randomIntFromRange(radius, canvas.height - radius)
            , indexChar = randomIndex(chars)
            , yI = IY[indexChar]
            , xD = DX[indexChar],
            time = 0,
            show = true
        // check if any letter of array and new letter are same place for y-coordinate //fix j 
        for (let j = EndLetter; j < letters.length; j++) {
            if (distance(x, y, letters[j].x, letters[j].y) - radius * 2 < 0) {
                y = randomIntFromRange(radius, canvas.height - radius),
                    j = -1 // for back to start loop when update
            }
        }
        letters.push(new Letter(time, show, velocity, x, y, radius, colorLive, chars[indexChar], x - xD, y + yI, 'white'))
        // increase counter letters
        Counterletters++
    }
    // increase speed for next letter
    /*if (speed < 15)
        speed += devspeed
    else { //speed arrive 15 so decrease devspeed
        devspeed = 0.1
    }*/
}, 1000)
//  call initialization function
init()

let checkIndex = 0
let mode = 0
let checkResult = new IntervalTimer(() => {
    let counter = 0
    for (let i = checkIndex; i < letters.length; i++) {
        if (letters[i].show == false && letters[i].colorCircle == colorDead) counter++
        if (mode < 3 && counter == 15) {
            speed += 0.002
            mode += 1
            checkIndex = i + 1
            console.log(speed)
            break
        }
        else if (mode ==3 && counter == 45) {
            mode = 0
            createLetterPerSecond += 1
            checkIndex = i + 1
            console.log(createLetterPerSecond)
            break
        }
    }
}, 1000)