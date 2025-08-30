function showGame(gameId) {
      document.querySelectorAll(".game-section").forEach(el => el.style.display = "none");
      document.getElementById(gameId).style.display = "block";
    }

    // ----------------- Snake Game Logic -----------------
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake, direction, food, score, game, running = false;

    function initGame() {
      snake = [{ x: 9 * box, y: 10 * box }];
      direction = "RIGHT";
      food = {
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box
      };
      score = 0;
      document.getElementById("score").textContent = score;
      running = true;
      document.getElementById("startScreen").style.display = "none";
      clearInterval(game);
      game = setInterval(draw, 100);
    }

    document.addEventListener("keydown", event => {
      if (!running && event.key === "Enter" && document.getElementById("snakeGame").style.display === "block") {
        initGame();
      }
      if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
      else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    });

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "rgba(38, 167, 241, 1)" : "rgba(31, 199, 241, 0.56)";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }

      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direction === "LEFT") snakeX -= box;
      if (direction === "UP") snakeY -= box;
      if (direction === "RIGHT") snakeX += box;
      if (direction === "DOWN") snakeY += box;

      if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        food = {
          x: Math.floor(Math.random() * 19) * box,
          y: Math.floor(Math.random() * 19) * box
        };
      } else {
        snake.pop();
      }

      let newHead = { x: snakeX, y: snakeY };

      if (
        snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height ||
        snake.some(part => part.x === newHead.x && part.y === newHead.y)
      ) {
        clearInterval(game);
        running = false;
        document.getElementById("startScreen").style.display = "block";
        document.getElementById("startScreen").innerText = "Game Over! Press ENTER to restart";
      }

      snake.unshift(newHead);
    }

    function resetGame() {
      running = false;
      document.getElementById("startScreen").style.display = "block";
      document.getElementById("startScreen").innerText = "Press ENTER to start";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }