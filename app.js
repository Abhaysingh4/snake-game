const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
const cs = 67;
const w = 1200;
const h = 735;
let food = null;
let gameOver = false;
let score = 0;

const snake = {
    init_length:5,
    direction: 'right',
    cells:[],
    createSnake: function () {
        for (let i = 0; i < this.init_length; i++){
            this.cells.push({
                x: i,
                y: 0
            }); 
        }
    },
    drawSnake: function () {
        for (let cell of this.cells) {
            pen.fillRect(cell.x*cs, cell.y*cs, cs-2, cs-2);
        }
    },
        updateSnake : function() {
            const headX = this.cells[this.cells.length - 1].x;
            const headY = this.cells[this.cells.length - 1].y;
            if (headX === food.x && headY === food.y) {
                food = getRandomFood();
                score++;
            }
            else {
                this.cells.shift();
            }
            let nextX;
            let nextY;
            if (this.direction === 'down') {
                nextX = headX;
                nextY = headY + 1;
                if (nextY * cs >= h) {
                    clearInterval(id);
                    pen.fillStyle = 'lightgreen';
                    pen.fillText("Game Over", 50, 100);
                }
            }
            else if (this.direction === 'up') {
                nextX = headX;
                nextY = headY - 1;
                if (nextY * cs < 0) {
                    clearInterval(id);
                    pen.fillStyle = 'lightgreen';
                    pen.fillText("Game Over", 50, 100);
                }
            }
            else if (this.direction === 'left') {
                nextX = headX - 1;
                nextY = headY;
                
                if (nextX* cs < 0) {
                    clearInterval(id);
                    pen.fillStyle = 'lightgreen';
                    pen.fillText("Game Over", 50, 100);
                }
            }
            else {
                nextX = headX + 1;
                nextY = headY;
                
                if (nextX * cs >= w) {    
                    clearInterval(id);
                    pen.fillStyle = 'lightgreen';
                    pen.fillText("Game Over", 50, 100);
                    // console.log("Game Over")
                }
            }
            // this.cells.shift();
            this.cells.push({
                x: nextX,
                y:nextY
            })

    }

}



function init() {
    snake.createSnake();
    food = getRandomFood();

    function keyPressed(e) {
        if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        }
        else if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        }
        else if (e.key === 'ArrowUp') {
            snake.direction = 'up';
        }
        else if(e.key==='ArrowRight'){
            snake.direction = 'right';
        }
        console.log(snake.direction);
    }

    document.addEventListener('keydown', keyPressed);
}
function update() {
    if (gameOver === true) {
        clearInterval(id);
    }
    snake.updateSnake();
}
function draw() {
    pen.clearRect(0, 0, w, h);
    pen.font = '40px sans-serif';
    pen.fillStyle = 'lightgreen';
    pen.fillText(`Score ${score}`, 50, 50);
    pen.fillStyle='blue';
    pen.fillRect(food.x*cs, food.y*cs, cs, cs);
    pen.fillStyle = 'yellow';
    snake.drawSnake();
}
function gameloop() {
    console.log('loop')
    draw();
    update();
}

function getRandomFood() {
    const foodX = Math.round(Math.random() * (w - cs)/cs);
    const foodY = Math.round(Math.random() * (h - cs)/cs);
    food = {
        x: foodX,
        y:foodY
    }
    return food;
}

init();
const id=setInterval(gameloop, 1000);