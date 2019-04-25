window.onload = () =>{
    const CANVAS_BORDER_COLOUR = "black";
    const CANVAS_BACKGROUND_COLOUR = "black";
    const SNAKE_COULOR = "yellow";
    const SNAKE_BORDER = "brown";
    const FOOD_COLOUR  = "lightgreen";
    const FOOD_BORDER  = "red"; 
    let dx = 10, dy = 0;
    let score = 0;

    let snakeCanvas = document.getElementById("snakeCanvas");
    let ctx = snakeCanvas.getContext("2d");

    
    let snake = [
        {x : 150, y : 250},
        {x : 240, y : 250},
        {x : 230, y : 250},
        {x : 220, y : 250},
        {x : 210, y : 250}
    ];
    
    document.addEventListener('keydown' , changeDirection);
    keepMoving();
    foodGen();
    function keepMoving() {
        if(endGame()){
            document.getElementById('endGame').innerHTML = "Game over!";
            return;
        }
        setTimeout(function onTick() {
            canvs();
            advanceSnake();
            drawFood();
            drawSnake();
            keepMoving();
            
        },100);
    }
    function canvs() {
        ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
        ctx.strokestyle = CANVAS_BORDER_COLOUR;

        ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
        ctx.strokeRect(0, 0, snakeCanvas.Width, snakeCanvas.height);

    }
    function drawSnake() {
        snake.forEach(drawSnakeParts);
    }
    function drawSnakeParts(snakePart) {
        ctx.fillStyle = SNAKE_COULOR;
        ctx.strokestyle = SNAKE_BORDER;

        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    function advanceSnake() {
        const head = {x : snake[0].x + dx, y : dy + snake[0].y};
        snake.unshift(head);
        let foodIsEaten = snake[0].x === foodX && snake[0].y === foodY;
        if(foodIsEaten){
            console.log(1);
            foodGen();
            score+=10;
            document.getElementById("score").innerHTML = score;
        }
        else{
            snake.pop();
        }
        
    }
    function changeDirection(event) {
        const LEFT_KEY = 37;
        const UP_KEY = 38;
        const RIGHT_KEY = 39;
        const DOWN_KEY = 40;

        const keyPressed = event.keyCode;
        const UP    = dy === -10;
        const RIGHT = dx ===  10;
        const DOWN  = dy ===  10;
        const LEFT  = dx === -10

        if(keyPressed ==LEFT_KEY && !RIGHT){
            dx = -10;
            dy = 0;
        }
        if(keyPressed ==UP_KEY && !DOWN){
            dx = 0;
            dy = -10;
        }
        if(keyPressed ==RIGHT_KEY && !LEFT){
            dx = 10;
            dy = 0;
        }
        if(keyPressed ==DOWN_KEY && !UP){
            dx = 0;
            dy = 10;
        }
    }
    function randPos(min,max) {
        return Math.round((Math.random()*(max-min)+min)/10)*10;
    }
    function foodGen(){
        foodX = randPos(0, snakeCanvas.width-10);
        foodY = randPos(0, snakeCanvas.height-10);
        snake.forEach((part) => {
            const food = part.x ===foodX && part.y ===foodY;
            if(food){
                foodGen();
            }
        })
    }
    function drawFood() {
        ctx.fillStyle = FOOD_COLOUR;
        ctx.strokestyle = FOOD_BORDER;
        
        ctx.fillRect(foodX, foodY, 10, 10);
        ctx.strokeRect(foodX, foodY, 10, 10);
    }
    function endGame() {
        for (let index = 4; index < snake.length; index++) {
            const collapse = snake[index].x === snake[0].x && snake[index].y === snake[0].y; 
            if(collapse){
                return true;
            }
            const hitTopWall = snake[0].y<0;
            const hitRightWall = snake[0].x>snakeCanvas.width - 10;
            const hitBottomWall = snake[0].y>snakeCanvas.height -10;
            const hitLeftWall = snake[0].x<0;
            return  hitTopWall || hitRightWall || hitBottomWall || hitLeftWall;
            
        }
    }
}
