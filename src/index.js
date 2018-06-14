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

/*const colors = ['#E37B40', '#46B29D', '#46B29D', '#324D5C', '#F0CA4D', '#F18229',
    '#458955', '#EDD569', '#3F628F', '#458955', '#E94128',
]*/
const colors = ['#59A2E8', '#EDD569', '#FF8E80', '#FFFFFF', '#E94128', '#F18229', '#458955', '#FEBEBC', '#F45265']
let
    chars = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ا', 'إ', 'آ', 'ؤ', 'ئ', 'ء'],
    idxy = [15, 8, 8, 8, 5, 5, 5, 10, 10, 5, 5, 5, 5, 5, 5, 10, 10, 5, 5, 10, 5, 13, 10, 5, 5, 5, 5, 5, 15, 15, 15, 5, 5, 10],
    letters, numberletters = 0

// update size when change size of window
addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})
// check if key is same any letter on scaner for delete
addEventListener('keydown', function (event) {
    // console.log(event)
    for (let i in letters) {
        if (event.key == letters[i].letter) {
            letters.splice(i, 1)
            console.log("when delete >>> " + letters.length)
        }

    }
})
// Implementation

function init() {
    letters = []
    let velocity = {
            x: -(Math.abs((Math.random() - 0.5) * 5)),
            y: (Math.random() - 0.5) * 5
        } // for speed letter
        ,
        radius = 30,
        // x = randomIntFromRange(radius, canvas.width - radius),
        x = canvas.width + 10,
        y = randomIntFromRange(radius, canvas.height - radius),
        indexColor = randomIndex(colors),
        indexChar = randomIndex(chars),
        ychar = idxy[indexChar]
    numberletters++
    letters.push(new Letter(numberletters, velocity, x, y, radius, colors[indexColor], chars[indexChar], x, y + ychar, 'black'))
}


// Animation Loop , this animation letter by update fun of letters
function animate() {
    canvasDraw.clearRect(0, 0, canvas.width, canvas.height)
    if (letters.length == 0) console.log('final ' + numberletters)
    else {
        requestAnimationFrame(animate)
        // letters.forEach(letter => {
        //     letter.update(letters)
        // })
        for (let i = 0; i < letters.length; i++) {
            letters[i].update(letters, i)
        }
    }

}

// create letter each 1 second
// this code for increase speed 
let speed = 5,
    devspeed = 0.5
setInterval(() => {
    // test 50 add letter ,becuase suddenly hide some letters ,and I don't why
    if (numberletters < 100) {
        // creater properties for new letter
        let velocity = {
                x: -(Math.abs((Math.random() - 0.5) * speed)),
                y: (Math.random() - 0.5) * 5
            } //for speed letter
            ,
            radius = 30,
            x = canvas.width + 10,
            y = randomIntFromRange(radius, canvas.height - radius),
            indexColor = randomIndex(colors),
            indexChar = randomIndex(chars),
            ychar = idxy[indexChar]
        // check if any letter of array and new letter are same place for y-coordinate
        for (let j = 0; j < letters.length; j++) {
            if (distance(x, y, letters[j].x, letters[j].y) - radius * 2 < 0) {
                // x = randomIntFromRange(radius, canvas.width - radius),
                y = randomIntFromRange(radius, canvas.height - radius),
                    j = -1 // for back to start loop when update
            }
        }
        numberletters++
        letters.push(new Letter(numberletters, velocity, x, y, radius, colors[indexColor], chars[indexChar], x, y + ychar, 'black'))
        console.log("new " + letters.length)
    }
    console.log(letters.length)
    // increase speed for next letter
    if (speed < 15)
        speed += devspeed
    else {
        devspeed += 0.1
        // console.log('speed',devspeed)
    }

}, 800)
//  call initialization function
init()
// call animaltion letter
animate()




// this code for increase speed 
/*let speed = 0.9,
    devspeed = 0.09*/

// increase speed for next letter
/* if (speed > devspeed)
     speed -= devspeed
 else {
     speed=0.9
     // console.log('id',devspeed)
 }
 // console.log(speed)*/