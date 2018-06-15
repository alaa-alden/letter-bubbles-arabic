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
//const colors = ['#59A2E8', '#EDD569', '#FF8E80', '#FFFFFF', '#E94128', '#F18229', '#458955', '#FEBEBC', '#F45265']

let
    chars = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ا', 'إ', 'آ', 'ؤ', 'ئ', 'ء'],
    idxy = [15, 8, 8, 8, 5, 5, 5, 10, 10, 5, 5, 5, 5, 5, 5, 10, 10, 5, 5, 10, 5, 13, 10, 5, 5, 5, 5, 5, 15, 15, 15, 5, 5, 10],
    letters, numberletters = 0

// update size when change size of window
addEventListener('resize', () => {
    canvas.width = 2*innerWidth/3
    canvas.height = 2*innerHeight/3
    init()
})
let CounterError = 0,
    CounterLeft = 0
// check if key is same any letter on scaner for delete
addEventListener('keydown', function (event) {
    // console.log(event)
    for (let i in letters) {
        if (event.key == letters[i].letter) {
            // letters.splice(i, 1)
            //letters[i].show=false
            letters[i].colorCircle = '#F01A30'
            console.log('when delete >>> ' + letters.length)
            return 0
        }
        if (i == letters.length - 1) CounterError++
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
        //indexColor = randomIndex(colors),
        indexChar = randomIndex(chars),
        ychar = idxy[indexChar]
    numberletters++
    letters.push(new Letter(0, true, velocity, x, y, radius, '#71DDE3', chars[indexChar], x, y + ychar, 'black'))
    //colors[indexColor], chars[indexChar], x, y + ychar, 'black'))
}


// Animation Loop , this animation letter by update fun of letters
function animate() {
    canvasDraw.clearRect(0, 0, canvas.width, canvas.height)
    if (CounterLeft == 5) canvasDraw.font = '40px arial',
    canvasDraw.textAlign = 'center',
    canvasDraw.fillText('good luck in the future', canvas.width/2, canvas.height/2)
    else {
        requestAnimationFrame(animate)
        letters.forEach(letter => {
            if (letter.colorCircle == '#F01A30')
                letter.old++,letter.radius+=0.5
            if(letter.old==25)
                letter.show=false
            else if(letter.show)
                letter.update(letters)
            // check if letter arrive to scanner left
            if (letter.x - letter.radius < 0 || letter.x - letter.radius > canvas.width + 10) {  
                if (letter.show){
                    if (letter.x - letter.radius < 0) CounterLeft++
                    if (letter.colorCircle == '#71DDE3')
                        console.log('when delete left/far right ' + letters.length)
                }
                letter.show = false

            }
        })
       
    }

}

// create letter each 1 second
// this code for increase speed 
let speed = 5,
    devspeed = 0.5
setInterval(() => {
    // test 50 add letter ,becuase suddenly hide some letters ,and I don't why
    if (numberletters < 25) {
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
        // check if any letter of array and new letter are same place for y-coordinate
        for (let j = 0; j < letters.length; j++) {
            if (distance(x, y, letters[j].x, letters[j].y) - radius * 2 < 0) {
                // x = randomIntFromRange(radius, canvas.width - radius),
                y = randomIntFromRange(radius, canvas.height - radius),
                j = -1 // for back to start loop when update
            }
        }
        numberletters++
        letters.push(new Letter(0, true, velocity, x, y, radius, '#71DDE3', chars[indexChar], x, y + ychar, 'black'))
        // colors[indexColor], chars[indexChar], x, y + ychar, 'black'))
        console.log('new ' + letters.length)
    }
    console.log(letters.length)
    // increase speed for next letter
    if (speed < 15)
        speed += devspeed
    else {
        devspeed += 0.1
        // console.log('speed',devspeed)
    }
    console.log('error '+CounterError)
    console.log('letter left '+CounterLeft)

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