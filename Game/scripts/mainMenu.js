let colors = ['##b59f3b', '#538d4e', '#ababab']
let ind = -1
let btnClicked = document.getElementById('btnClickedSound')


onload = () => {
    createBackground()
}

function createBackground()
{
    for (let i = 0; i < 600; i++) {
        let box = document.createElement('div')
        box.className = 'box'
        ind = (++ind) % (colors.length )
        box.style.backgroundColor = (colors[ind])
        document.getElementsByTagName('body')[0].appendChild(box)
    }
}

document.querySelector('#startBtn').addEventListener('click', () => {
    btnClicked.play()
    setTimeout(() => {
        open('../pages/game.html', "_self")
    }, 500);
})

document.querySelector('#quitBtn').addEventListener('click', () => {
    btnClicked.play()
    setTimeout(() => {
        window.close()
    }, 500);
})