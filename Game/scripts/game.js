import { WORDS } from "./words.js";
import { draw  } from "./canvas.js";


// Global Variables
const number_of_guesses = 6;
let guessesRemaning = number_of_guesses;
let currentGuess = [];
let fails = 0
let letterIndex = 0;
let rightGuess = WORDS[Math.floor(Math.random() * WORDS.length)]
let rightGuessArr = Array.from(rightGuess)
let playAgainBtn = document.querySelector('[data-playBtn]')
let cancelBtn = document.querySelector('[data-cancelBtn]')
let flipLetter = document.getElementById('flippingSound')
let gameover = document.getElementById('gameoverSound')
let btnClicked = document.getElementById('btnClickedSound')


console.log(rightGuess)

//play again
playAgainBtn.addEventListener('click', () => {
    btnClicked.play()
    setTimeout(() => {
        location.reload()
    }, 500);
})

//exit from game
cancelBtn.addEventListener('click', () => {
    btnClicked.play()
    setTimeout(() => {
        open('../pages/mainMenu.html', "_self")
    }, 500);
})


// Initial Board
function initBoard(){
    let board = document.getElementById("game-board");
    
    for (let i = 0; i < number_of_guesses; i++){
        let row = document.createElement('div');
        row.className = 'row'
        for (let j = 0; j < 5; j++) {
            let box = document.createElement('div');
            box.className = 'box'
            row.appendChild(box);
        }
        board.appendChild(row);
    }
}


// Giving all letter ids
function createLetterIDs(){
    let kb = document.querySelectorAll('.keyboard-button')
    for (let j = 0; j < kb.length - 1; j++)
    {   
        let val = kb[j].innerHTML
        if (val == 'Enter')
            continue
        kb[j].id = val
    }
}


// Main function
document.addEventListener("keyup",(e) => {

    if(guessesRemaning === 0){
        return;
    }

    let pressedKey = String(e.key)
    if(pressedKey === "Backspace" && letterIndex !== 0){
        deleteLetter()
        console.log("delete")
        return;
    }
    if(pressedKey === "Enter"){
        check()
        return;
    }
    let filter = pressedKey.match(/[a-z]/gi)
    if(!filter || filter.length > 1){
        return
    }else{insertLetter(pressedKey)}
})


// user input using keyboard
function insertLetter(pressedKey){
    if(letterIndex === 5 ){
        return
    }
    let row = document.getElementsByClassName("row")[6 - guessesRemaning]
    let box = row.children[letterIndex]
    pressedKey = pressedKey.toLowerCase()
    box.textContent = pressedKey
    btnClicked.play()

    //appling animation on keyboard when key pressed
    document.getElementById(pressedKey).style.animation = 'clickedLetter 0.3s'
    //removing the previous animation to be applied again when key pressed
    setTimeout(() => {
        document.getElementById(pressedKey).style.animation = null
    }, 200);

    //appling animation on box when key pressed
    box.style.border = "2px solid #949496"
    box.style.backgroundColor = "#3a3a3c"
    box.style.animation = 'animateBorder 0.1s'
    // flipOnAnswer(box)
    
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    console.log(currentGuess.length)
    console.log(currentGuess)
    letterIndex +=1;
}

function flipOnAnswer(b){
    b.style.transitionDuration="1s";
    b.style.transform = 'rotateY(360deg)';
}


// user input using on-Screen keyboard
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
    let key = target.textContent
    
    // check for normal buttons --- Just to make sure it's not Backspace
    if (target.classList.contains("keyboard-button")) {
        console.log("Button clicked!");
    }
    // Check for Backspace button
    else if(target.closest(".keyboard-button")) {
        key = "Backspace";
        console.log("SVG clicked!");
    }
    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
});


// Deleting Letter Function
function deleteLetter(pressedKey){
    document.getElementById('hoverSound').play()
    let row = document.getElementsByClassName("row")[6 - guessesRemaning]
    let box = row.children[letterIndex - 1]
    
    //removing the applied animation on box after deleting letter
    box.style.border = "2px solid #3a3a3c"
    box.style.backgroundColor = "transparent"
    box.style.animation = null
    box.style.transform = null
    
    
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop(pressedKey)
    letterIndex -= 1;
}


function check(){
    let result = document.querySelector('[data-gameResult]')
    let answer = document.querySelector('[data-answer]')

    let row = document.getElementsByClassName("row")[6 - guessesRemaning]
    let myword = currentGuess.join('')
    if(currentGuess.length != 5){
        alert("Not Enough Letters")
        return
    }
    if(!WORDS.includes(myword)){
        alert("Word not in the list!")
        return
    }

    for(let i = 0; i< 5; i++){
        let boxColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        let letterPosition = rightGuessArr.indexOf(currentGuess[i])

        if(letterPosition === -1){
            boxColor = "var(--empty)"
        }else{

            if(rightGuess[i] === currentGuess[i]){
                boxColor = "var(--right)"
            }else{
                boxColor = "var(--wrong)"
            }

        }
        setTimeout(()=> {
            box.style.backgroundColor = boxColor
            // box.style.animation = 'flip 0.1s'

            //appling animation on keyboard and sound when pressing key
            flipOnAnswer(box)
            flipLetter.play()

            keyboardColor(letter,boxColor) 
        },250 * i)
    }
    if(myword === rightGuess){
        //displaying message when player wins
        result.innerHTML = `You Got it right!`
        result.style.color = 'Green'
        playAgainBtn.style.visibility = 'visible'
        displayResult()
        // alert("You Guessed right!")
        guessesRemaning = 0
        return
    }else{
        guessesRemaning -= 1
        currentGuess = []
        letterIndex = 0;

        //calling the canvas function to draw when he fails guessing
        if (fails <= number_of_guesses)
            draw(++fails)

        if(guessesRemaning === 0){
            //displaying message when player loses
            setTimeout(() => {
                gameover.play()
            }, 1700);
            result.innerHTML = 'You have ran of out guesses! <br> The word is:'
            answer.innerHTML = `'${rightGuess}'`
            result.style.color = 'rgb(190 18 60)'
            answer.style.color = '#538d4e'
            playAgainBtn.style.visibility = 'visible'
            displayResult()
            // alert("You've run out of guesses! Game over!")
            // alert(`The right word was : ${rightGuess}`)
        }

    }
}

function keyboardColor(letter, boxColor){
    let letterBox = document.getElementById(letter)
    console.log(letterBox)
    letterBox.style.backgroundColor = boxColor
}


// Calling inital board function
initBoard()
// displayResult()
createLetterIDs()
// ****************************


function displayResult(){
    let container = document.querySelector(".StatusGame")

    container.style.left = "calc((100% - 450px) / 2)"
    container.style.transition = '0.1s 0.1s';
}


let option = document.querySelector(".optwo")

option.addEventListener("click",() => {
    // console.log("test");
    let container = document.querySelector(".optionspagecontainer")

    container.style.left = "calc((100% - 450px) / 2)"
    container.style.transition = '0.1s 0.1s';

    
} )


let closesign = document.querySelector(".closesign")

closesign.addEventListener("click", () => {
    let container = document.querySelector(".optionspagecontainer")
    container.style.left = "150%"
    container.style.transition = '0.2s 0.3s';
    // container.style.display = "none"
})
document.querySelector('.closeState').addEventListener("click", () => {
    let container = document.querySelector(".StatusGame")
    container.style.left = "150%"
    container.style.transition = '0.2s 0.3s';
    // container.style.display = "none"
})

document.addEventListener("click", (e) => {
    if ( (e.target.getAttribute("class") !== "optionspagecontainer") && e.target.getAttribute("class") !== "optwo"  )
    {
        let container = document.querySelector(".optionspagecontainer")
        console.log(container)
        container.style.left = "150%"
        container.style.transition = '0.2s 0.3s';
    }
    
})


let opthree = document.querySelector(".opthree")
opthree.addEventListener("click", () => {
    let stylelink = document.querySelector("#style")
    let arr = stylelink.href.split("/")
    let len = arr.length
    let hrefx = arr[len-1]

    if (hrefx == "game.css"){
        stylelink.href = "../styles/gamecopy.css"
    }
    else{
        stylelink.href = "../styles/game.css"
    }
    
})

let retry = document.querySelector(".retry")

retry.addEventListener("click", () => {
    location.reload()
})
