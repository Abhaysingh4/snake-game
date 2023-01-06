const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
const cs = 67;
const w = 1200;
const h = 735;
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
            pen.fillRect(cell.x*cs, cell.y*cs, cs-1, cs-1);
        }
    },
        updateSnake : function() {
            const headX = this.cells[this.cells.length - 1].x;
            const headY = this.cells[this.cells.length - 1].y;
            let nextX = headX + 1;
            let nextY = headY;
            this.cells.shift();
            this.cells.push({
                x: nextX,
                y:nextY
            })

    }

}


pen.fillStyle = 'red';

function init() {
    snake.createSnake();


    function keyPressed(e) {
        console.log(e);
    }

    document.addEventListener('keypress', keyPressed);
}
function update() {
    snake.updateSnake();
}
function draw() {
    pen.clearRect(0, 0, w, h);
    snake.drawSnake();
}
function gameloop() {
    console.log('loop')
    update();
    draw();
}
init();
setInterval(gameloop, 100);