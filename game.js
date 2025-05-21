document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const scoreValue = document.getElementById('score-value');
    const livesValue = document.getElementById('lives-value');
    const finalScore = document.getElementById('final-score');

    // Set canvas dimensions
    canvas.width = 500;
    canvas.height = 600;

    // Game state
    let gameActive = false;
    let score = 0;
    let lives = 3;
    let gameLoopId;
    let lastTime = 0;
    let enemySpawnTimer = 0;
    let bulletTimer = 0;

    // Game objects
    const player = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 70,
        width: 50,
        height: 50,
        speed: 5,
        color: '#00aaff',
        isMovingLeft: false,
        isMovingRight: false,
        isMovingUp: false,
        isMovingDown: false,
        isShooting: false
    };

    let bullets = [];
    let enemies = [];
    let explosions = [];

    // Game images
    const playerImage = new Image();
    playerImage.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZmlsbD0iIzAwYWFmZiIgZD0iTTI1LDFMNSwyMGwyMCwxMGwyMC0xMEwyNSwxeiIvPjxwYXRoIGZpbGw9IiMwMDU1YWEiIGQ9Ik0yNSwzMGw1LDIwaDEwbC0xNS0yMHoiLz48cGF0aCBmaWxsPSIjMDA1NWFhIiBkPSJNMjUsMzBsLTUsMjBIMTBsMTUtMjB6Ii8+PC9zdmc+';

    const enemyImage = new Image();
    enemyImage.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZmlsbD0iI2ZmMDAzMyIgZD0iTTI1LDFMNSwyMGwyMCwxMGwyMC0xMEwyNSwxeiIvPjxwYXRoIGZpbGw9IiNhYTAwMjIiIGQ9Ik0yNSwzMHYyMGgxMGwtMTAtMjB6Ii8+PHBhdGggZmlsbD0iI2FhMDAyMiIgZD0iTTI1LDMwdjIwSDEwbDEwLTIweiIvPjwvc3ZnPg==';

    // Event listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    window.addEventListener('keydown', (e) => {
        if (gameActive) {
            switch (e.key) {
                case 'ArrowLeft':
                    player.isMovingLeft = true;
                    break;
                case 'ArrowRight':
                    player.isMovingRight = true;
                    break;
                case 'ArrowUp':
                    player.isMovingUp = true;
                    break;
                case 'ArrowDown':
                    player.isMovingDown = true;
                    break;
                case ' ':
                    player.isShooting = true;
                    break;
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                player.isMovingLeft = false;
                break;
            case 'ArrowRight':
                player.isMovingRight = false;
                break;
            case 'ArrowUp':
                player.isMovingUp = false;
                break;
            case 'ArrowDown':
                player.isMovingDown = false;
                break;
            case ' ':
                player.isShooting = false;
                break;
        }
    });

    // Game functions
    function startGame() {
        // Reset game state
        score = 0;
        lives = 3;
        bullets = [];
        enemies = [];
        explosions = [];
        
        // Reset player position
        player.x = canvas.width / 2 - 25;
        player.y = canvas.height - 70;
        
        // Update UI
        scoreValue.textContent = score;
        livesValue.textContent = lives;
        
        // Hide screens
        startScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        
        // Start game loop
        gameActive = true;
        lastTime = Date.now();
        if (gameLoopId) {
            cancelAnimationFrame(gameLoopId);
        }
        gameLoop();
    }

    function gameLoop() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        update(deltaTime);
        render();
        
        if (gameActive) {
            gameLoopId = requestAnimationFrame(gameLoop);
        }
    }

    function update(deltaTime) {
        // Player movement
        if (player.isMovingLeft && player.x > 0) {
            player.x -= player.speed * deltaTime * 60;
        }
        if (player.isMovingRight && player.x < canvas.width - player.width) {
            player.x += player.speed * deltaTime * 60;
        }
        if (player.isMovingUp && player.y > 0) {
            player.y -= player.speed * deltaTime * 60;
        }
        if (player.isMovingDown && player.y < canvas.height - player.height) {
            player.y += player.speed * deltaTime * 60;
        }
        
        // Shooting
        bulletTimer += deltaTime;
        if (player.isShooting && bulletTimer > 0.2) {
            bullets.push({
                x: player.x + player.width / 2 - 2,
                y: player.y,
                width: 4,
                height: 15,
                speed: 8,
                color: '#00ffff'
            });
            bulletTimer = 0;
        }
        
        // Update bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].y -= bullets[i].speed * deltaTime * 60;
            
            // Remove bullets out of screen
            if (bullets[i].y < -bullets[i].height) {
                bullets.splice(i, 1);
            }
        }
        
        // Spawn enemies
        enemySpawnTimer += deltaTime;
        if (enemySpawnTimer > 1.5) {
            const enemySize = 40;
            enemies.push({
                x: Math.random() * (canvas.width - enemySize),
                y: -enemySize,
                width: enemySize,
                height: enemySize,
                speed: 2 + Math.random() * 1,
                color: '#ff0033'
            });
            enemySpawnTimer = 0;
        }
        
        // Update enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            enemies[i].y += enemies[i].speed * deltaTime * 60;
            
            // Check for collisions with bullets
            for (let j = bullets.length - 1; j >= 0; j--) {
                if (checkCollision(bullets[j], enemies[i])) {
                    // Create explosion
                    explosions.push({
                        x: enemies[i].x + enemies[i].width / 2,
                        y: enemies[i].y + enemies[i].height / 2,
                        radius: 20,
                        maxRadius: 30,
                        speed: 1,
                        opacity: 1
                    });
                    
                    // Update score
                    score += 10;
                    scoreValue.textContent = score;
                    
                    // Remove enemy and bullet
                    enemies.splice(i, 1);
                    bullets.splice(j, 1);
                    break;
                }
            }
            
            // Check if enemy passed the screen
            if (i >= 0 && enemies[i] && enemies[i].y > canvas.height) {
                enemies.splice(i, 1);
                lives--;
                livesValue.textContent = lives;
                
                if (lives <= 0) {
                    gameOver();
                }
            }
            
            // Check for collision with player
            if (i >= 0 && enemies[i] && checkCollision(player, enemies[i])) {
                // Create explosion
                explosions.push({
                    x: enemies[i].x + enemies[i].width / 2,
                    y: enemies[i].y + enemies[i].height / 2,
                    radius: 30,
                    maxRadius: 40,
                    speed: 1,
                    opacity: 1
                });
                
                enemies.splice(i, 1);
                lives--;
                livesValue.textContent = lives;
                
                if (lives <= 0) {
                    gameOver();
                }
            }
        }
        
        // Update explosions
        for (let i = explosions.length - 1; i >= 0; i--) {
            explosions[i].radius += explosions[i].speed * deltaTime * 60;
            explosions[i].opacity -= deltaTime * 2;
            
            if (explosions[i].opacity <= 0) {
                explosions.splice(i, 1);
            }
        }
    }

    function render() {
        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw background stars
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = (Math.random() * canvas.height + lastTime * 0.01) % canvas.height;
            const size = Math.random() * 2;
            ctx.fillRect(x, y, size, size);
        }
        
        // Draw player
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
        
        // Draw bullets
        ctx.fillStyle = '#00ffff';
        for (const bullet of bullets) {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
        
        // Draw enemies
        for (const enemy of enemies) {
            ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
        }
        
        // Draw explosions
        for (const explosion of explosions) {
            const gradient = ctx.createRadialGradient(
                explosion.x, explosion.y, 0,
                explosion.x, explosion.y, explosion.radius
            );
            gradient.addColorStop(0, `rgba(255, 255, 0, ${explosion.opacity})`);
            gradient.addColorStop(0.5, `rgba(255, 100, 0, ${explosion.opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function gameOver() {
        gameActive = false;
        finalScore.textContent = score;
        gameOverScreen.classList.remove('hidden');
    }

    function checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
}); 