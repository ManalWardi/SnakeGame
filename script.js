
var blockSize = 25; //taille de bloc 
var rows = 20;
var cols = 25;
var canva;
var context; 

//coord de tete serpent
var serpentX = blockSize * 23;
var serpentY = blockSize * 1;

var directionX = 0;
var directionY = 0;

var serpCorps = [];


var foodX;
var foodY;

var finJeu = false;

window.onload = function() {
    canva = document.getElementById("canva");
    canva.height = rows * blockSize;
    canva.width = cols * blockSize;
    canva.style.backgroundColor="gray";
    canva.style.border="10px solid black";
    context = canva.getContext("2d");

    posFood();
    document.addEventListener("keyup", changerDirect);
    
    setInterval(modifPos, 1000/8); 
}

function modifPos() {
    if (finJeu) {
        return;
    }

    context.fillStyle="gray";
    context.fillRect(0, 0, canva.width, canva.height);

    context.fillStyle="pink";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (serpentX == foodX && serpentY == foodY) {
        serpCorps.push([foodX, foodY]);
        posFood();
    }

    for (let i = serpCorps.length-1; i > 0; i--) {
        serpCorps[i] = serpCorps[i-1];
    }
    if (serpCorps.length) {
        serpCorps[0] = [serpentX, serpentY];
    }

    context.fillStyle="rgb(119, 221, 255)";
    serpentX += directionX * blockSize;
    serpentY += directionY * blockSize;
    context.fillRect(serpentX, serpentY, blockSize, blockSize);
    for (let i = 0; i < serpCorps.length; i++) {
        context.fillRect(serpCorps[i][0], serpCorps[i][1], blockSize, blockSize);
    }

    //Fin de jeu conditions
    if (serpentX < 0 || serpentX > cols*blockSize || serpentY < 0 || serpentY > rows*blockSize) {
        finJeu = true;
        alert("Fin de jeu");
    }

    for (let i = 0; i < serpCorps.length; i++) {
        if (serpentX == serpCorps[i][0] && serpentY == serpCorps[i][1]) {
            finJeu = true;
            alert("Fin de jeu");
        }
    }
}

function changerDirect(e) {
    if (e.code == "ArrowUp" && directionY != 1) {
        directionX = 0;
        directionY = -1;
    }
    else if (e.code == "ArrowDown" && directionY != -1) {
        directionX = 0;
        directionY = 1;
    }
    else if (e.code == "ArrowLeft" && directionX != 1) {
        directionX = -1;
        directionY = 0;
    }
    else if (e.code == "ArrowRight" && directionX != -1) {
        directionX = 1;
        directionY = 0;
    }
}


function posFood() {
    
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}


    
