const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

const keys = {};

const player = {
    x: 200,
    y: 300,
    width: 40,
    height: 72,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
};

const playerSprite = new Image();
playerSprite.src = "/starwarssprites/chewie.png";
const background = new Image();
background.src = "/background.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

setInterval(() => {}, 1000 / 60);

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    player.moving = true;
});

window.addEventListener("keyup", (e) => {
    delete keys[e.key];
    player.moving = false;
});

function movePlayer() {
    if (keys["ArrowUp"] && player.y > 100) {
        player.y -= player.speed;
        // player.frameX = 3;
        player.frameY = 3;
           player.moving = true;
    }
    if (keys["ArrowDown"] && player.y < canvas.height - player.height - 100) {
        player.y += player.speed;
        // player.frameX = 0;
        player.frameY = 0;
           player.moving = true;
    }
    if (keys["ArrowLeft"] && player.x > 100) {
        player.x -= player.speed;
        // player.frameX = 1;
        player.frameY = 1;
           player.moving = true;
    }
    if (keys["ArrowRight"] && player.x < canvas.width - player.width - 100) {
        player.x += player.speed;
        // player.frameX = 2;
        player.frameY = 2;
           player.moving = true;
    }
}
function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
}


let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimation(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(
            playerSprite,
            player.frameX * player.width,
            player.frameY * player.height,
            player.width,
            player.height,
            player.x,
            player.y,
            player.width,
            player.height
        );
        movePlayer();
        handlePlayerFrame();
    }
}
startAnimation(27);
