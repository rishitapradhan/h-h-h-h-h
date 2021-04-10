let canvas = document.querySelector('#gamePage')
let ctx = canvas.getContext('2d')

canvas.style.border = '2px solid black'


// Variables
let intervalId = 0
let score = 0
let startBtn = document.getElementById('startButton')
let loadPage = document.getElementById('loadingPage')
let gameOverPage = document.getElementById('gameOver')
let restartBtn = document.getElementById('restartBtn')
let incrementPlayer = 8
let playerX = 199
let playerY = 610
let isLeftArrow = false;
let isRightArrow = false;
let isAttackKey = false;
let isMeleeAttackLeft = false;
let isMeleeAttackRight = false;

// Array for the sword and Titans
let swords1 = []
let titans1 = [{x: 50, y: -400}]
let titans2 = [{x: 200, y: -450}]

// Speed incrementation
let dy1 = 5
let dy2 = 2
let dx = -7


// Creation of the images
let welcomeImg = document.createElement('img')
welcomeImg.src = 'images/welcome1.jpg'

let gamePage = document.createElement('img')
gamePage.src = 'images/game pages.png'
let player = document.createElement('img')
player.src = 'images/mikasa2.png'

let titan1 = document.createElement('img')
titan1.src = 'images/titan1.png'
let titan2 = document.createElement('img')
titan2.src = 'images/titan2.png'

let sword = document.createElement('img')
sword.src = 'images/sword.png'

let swordLeft = document.createElement('img')
swordLeft.src = 'images/sword melee L.png'

let swordRight = document.createElement('img')
swordRight.src = 'images/sword melee R.png'

// Action for the player 
document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
    isAttackKey = false;
    isMeleeAttackLeft = false;
    isMeleeAttackRight = false;
})

document.addEventListener('keydown', (event) => {
    if (event.keycode == 32 || event.code == "Space") {
       isAttackKey = true;
    }
   
    else if (event.keyCode == 39 || event.key == "ArrowRight"){
        isRightArrow = true;
        isLeftArrow = false;
    }
    else if (event.keycode == 37 || event.key == "ArrowLeft") {
        isRightArrow = false;
        isLeftArrow = true;
    }
    else if (event.keycode == 38 || event.key == "ArrowUp"){
        isMeleeAttackLeft = true;
        isMeleeAttackRight = false
    }
    else if (event.keycode == 40 || event.key == "ArrowDown"){
        isMeleeAttackRight = true;
        isMeleeAttackLeft = false;
    }

})


// Sword draw and add new in the array
function swords(){
    if (isAttackKey){
        swords1.push({x: playerX, y: playerY})
        isAttackKey = false
        swordLaunch.play() 
    }

    for (let i = 0; i < swords1.length; i++){
        ctx.drawImage(sword, swords1[i].x, swords1[i].y)
        swords1[i].y += dx
    }
}


// Titan1
function alwaysTitans1(){
    if (titans1.length === 0){
        titans1.push({
            x: Math.floor(Math.random() * (canvas.width - titan1.width)),
            y: -400,
        })
    } 
}

function titansFall1() {

    for (let i = 0; i < titans1.length; i++) {
        ctx.drawImage(titan1, titans1[i].x, titans1[i].y)
        //ctx.drawImage(titan2, titans[i].x + 100, titans[i].y)
        titans1[i].y += dy1
        if (titans1[i].y == -100){
            titans1.push({
                x: Math.floor(Math.random() * (canvas.width - titan1.width)),
                y: -400
            })
        }   
    }
}

function titansReach1(){
    for (let i = 0; i < titans1.length; i ++){
        if (titans1[i].y + titan1.height > canvas.height){
            clearInterval(intervalId)
            gameOver()
        }    
    }
}

function titans1Collision (){
    for (let i = 0; i < titans1.length; i++){
        for (let j = 0; j < swords1.length; j++){
            if ((swords1[j].x < titans1[i].x + titan1.width/2 && swords1[j].x + sword.width/2 > titans1[i].x) && 
            (swords1[j].y < titans1[i].y + titan1.height)){
                titans1.splice(i, 1)
                swords1.splice(j, 1)
                score ++
                collision.play()
            }
        }
    }
    ctx.beginPath()
    ctx.font = '30px Verdana red'
    ctx.fillText('Titans killed: ' + score, 10, 30)
    ctx.fillStyle = '#571e1e'
    ctx.closePath()
}

function mikasaVsTitan1(){
    for (let i = 0; i < titans1.length; i++){
        if ((playerX < titans1[i].x + titan1.width/2 && playerX + player.width/2 > titans1[i].x) && 
        (playerY < titans1[i].y + titan1.height/2)){
            clearInterval(intervalId)
            gameOver()
        }
    }
}


// Titan2
function alwaysTitans2(){
    if (titans2.length === 0){
        titans2.push({
            x: Math.floor(Math.random() * (canvas.width - titan1.width)),
            y: -450
        })
    } 
}

function titansFall2() {

    for (let i = 0; i < titans2.length; i++) {
        ctx.drawImage(titan2, titans2[i].x, titans2[i].y)
        titans2[i].y += dy2
        if (titans2[i].y == -100){
            titans2.push({
                x: Math.floor(Math.random() * (canvas.width - titan1.width)),
                y: -450
            }) 
        }  
    }
}

function titansReach2(){
    for (let i = 0; i < titans2.length; i ++){
        if (titans2[i].y + titan2.height > canvas.height){
            clearInterval(intervalId)
            gameOver()
        }    
    }
}


// Mikasa draw / attack / collision
function mikasa(){
    ctx.drawImage(player, playerX, playerY)

    if (isRightArrow && (playerX + player.width < canvas.width)) {
        playerX += incrementPlayer

    }
    else if (isLeftArrow && playerX > 0) {
        playerX -= incrementPlayer

    }

}

function mikasaMeleeLeft(){
    for (let i = 0; i < titans2.length; i++){
        if ((playerX  + player.width > titans2[i].x && playerX + 120 > titans2[i].x + titan2.width) && 
        (playerY < titans2[i].y + titan2.height/2) && (isMeleeAttackLeft === true)){ 
            titans2.splice(i, 1)
            score ++
            melee.play()
        }
    }
}

function mikasaMeleeRight(){
    for (let i = 0; i < titans2.length; i++){
        if ((playerX + 120 < titans2[i].x + titan2.width & playerX + player.width > titans2[i].x) && 
        (playerY < titans2[i].y + titan2.height/2)  && (isMeleeAttackRight === true)){
            titans2.splice(i, 1)
            score ++
            melee.play()
        }
    }
}

function meleeAttackLeft(){
    if (isMeleeAttackLeft){
        ctx.drawImage(swordLeft, playerX, playerY + 20)
        isMeleeAttackLeft = true
    }
}

function meleeAttackRight(){
    if (isMeleeAttackRight){
        ctx.drawImage(swordRight, x = playerX + 25, y = playerY + 20)
        isMeleeAttackRight = true
    }
}

// The different stage of the game
function gamePlay (){
    ctx.drawImage(gamePage, 0, 0)
    gaming.play()

    titansFall2()
    titansFall1()
    swords()
    meleeAttackLeft()
    meleeAttackRight()
    mikasa()
    titans1Collision()
    titansReach1()
    titansReach2()
    alwaysTitans1()
    alwaysTitans2()
    mikasaMeleeLeft()
    mikasaMeleeRight()
    mikasaVsTitan1()

    preload()
}

function startGame(){
    canvas.style.display = 'block'
    intro.pause()
    startBtn.style.display = 'none' 
    loadPage.style.display = 'none'
    gameOverPage.style.display = 'none'
    intervalId = setInterval(() => {
        requestAnimationFrame(gamePlay)
    }, 30) 
}

function gameOver(){
    gaming.pause()
    over.play()
    canvas.style.display = 'none'
    startBtn.style.display = 'none' 
    loadPage.style.display = 'none'
    gameOverPage.style.display = 'block'
    restartBtn.addEventListener('click', () => {
        location.reload();
    })
    document.querySelector('#total-kill span').innerHTML = score
}

window.addEventListener('load', () => {  

// MUsic theme
intro = new Audio('sounds/Intro.mp3')
gaming = new Audio('sounds/Gaming.mp3')
over = new Audio('sounds/game-over.mp3')

// Sound effect
swordLaunch = new Audio('sounds/sword-launch .wav')
melee = new Audio('sounds/melee-attack.wav')
collision = new Audio('sounds/collision.mp3')

    loadPage.style.display = 'block'
    over.pause()
    intro.play()
    canvas.style.display = 'none'
    gameOverPage.style.display = 'none'
    startBtn.addEventListener('click', () => {
        startGame()
    })
})
