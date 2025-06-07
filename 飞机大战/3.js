// 游戏类
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // 游戏状态
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        
        // 游戏对象
        this.player = new Player(this.width / 2, this.height - 100);
        this.bullets = [];
        this.enemies = [];
        this.powerUps = [];
        this.particles = [];
        
        // 游戏计时器
        this.enemySpawnTimer = 0;
        this.powerUpSpawnTimer = 0;
        this.lastTime = 0;
        
        // 输入处理
        this.keys = {};
        
        // 音效系统
        this.sounds = {};
        this.soundEnabled = true;
        
        try {
            this.sounds = {
                shoot: new Audio('sounds/shoot.mp3'),
                explosion: new Audio('sounds/explosion.mp3'),
                powerUp: new Audio('sounds/powerup.mp3'),
                gameOver: new Audio('sounds/gameover.mp3')
            };
        } catch (error) {
            console.log('音效加载失败:', error);
            // 如果音效加载失败，禁用音效
            this.soundEnabled = false;
        }
        
        // 难度设置
        this.difficulty = 'normal';
        this.difficultySettings = {
            easy: {
                enemySpawnRate: 1500,
                enemySpeed: 1.5,
                enemyPoints: 50,
                playerSpeed: 6
            },
            normal: {
                enemySpawnRate: 1000,
                enemySpeed: 2,
                enemyPoints: 100,
                playerSpeed: 5
            },
            hard: {
                enemySpawnRate: 800,
                enemySpeed: 3,
                enemyPoints: 150,
                playerSpeed: 4
            }
        };
        
        // 高分记录
        this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
        this.updateHighScore();
        
        this.setupEventListeners();
        this.updateUI();
    }
    
    setupEventListeners() {
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.keys[e.code] = true;
            
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                if (this.gameState === 'playing') {
                    this.player.shoot(this.bullets, this);
                    this.playSound('shoot');
                }
            }
            
            if (e.key.toLowerCase() === 'p' && this.gameState !== 'menu') {
                this.togglePause();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.keys[e.code] = false;
        });
        
        // 按钮事件
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('soundBtn').addEventListener('click', () => this.toggleSound());
        
        // 难度选择事件
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            if (this.gameState === 'playing') {
                this.restartGame();
            }
        });
    }
    
    startGame() {
        this.gameState = 'playing';
        // 根据难度设置玩家速度
        this.player.speed = this.difficultySettings[this.difficulty].playerSpeed;
        this.updateButtons();
        this.gameLoop();
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.gameLoop();
        }
        this.updateButtons();
    }
    
    restartGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        
        // 重置游戏对象
        this.player = new Player(this.width / 2, this.height - 100);
        this.bullets = [];
        this.enemies = [];
        this.powerUps = [];
        this.particles = [];
        
        this.enemySpawnTimer = 0;
        this.powerUpSpawnTimer = 0;
        
        this.updateUI();
        this.updateButtons();
        this.hideGameOverModal();
        this.gameLoop();
    }
    
    updateButtons() {
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        if (this.gameState === 'menu') {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            restartBtn.disabled = true;
            pauseBtn.textContent = '暂停';
        } else if (this.gameState === 'playing') {
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            restartBtn.disabled = false;
            pauseBtn.textContent = '暂停';
        } else if (this.gameState === 'paused') {
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            restartBtn.disabled = false;
            pauseBtn.textContent = '继续';
        }
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
    }
    
    showGameOverModal() {
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOverModal').classList.remove('hidden');
        this.updateHighScore();
        this.playSound('gameOver');
    }
    
    hideGameOverModal() {
        document.getElementById('gameOverModal').classList.add('hidden');
    }
    
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
        }
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('modalHighScore').textContent = this.highScore;
    }
    
    update(deltaTime) {
        if (this.gameState !== 'playing') return;
        
        // 更新玩家
        this.player.update(this.keys);
        
        // 更新子弹
        this.bullets.forEach((bullet, index) => {
            bullet.update();
            if (bullet.y < 0) {
                this.bullets.splice(index, 1);
            }
        });
        
        // 生成敌人
        this.enemySpawnTimer += deltaTime;
        if (this.enemySpawnTimer > this.difficultySettings[this.difficulty].enemySpawnRate - (this.level * 50)) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
        }
        
        // 更新敌人
        this.enemies.forEach((enemy, index) => {
            enemy.update();
            if (enemy.y > this.height) {
                this.enemies.splice(index, 1);
            }
        });
        
        // 生成道具
        this.powerUpSpawnTimer += deltaTime;
        if (this.powerUpSpawnTimer > 10000) {
            this.spawnPowerUp();
            this.powerUpSpawnTimer = 0;
        }
        
        // 更新道具
        this.powerUps.forEach((powerUp, index) => {
            powerUp.update();
            if (powerUp.y > this.height) {
                this.powerUps.splice(index, 1);
            }
        });
        
        // 更新粒子效果
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
        
        // 碰撞检测
        this.checkCollisions();
        
        // 检查游戏结束
        if (this.lives <= 0) {
            this.gameState = 'gameOver';
            this.showGameOverModal();
        }
        
        // 升级检查
        if (this.score > this.level * 1000) {
            this.level++;
        }
        
        // 更新高分
        this.updateHighScore();
    }
    
    spawnEnemy() {
        const x = Math.random() * (this.width - 60);
        const type = Math.random() < 0.7 ? 'normal' : 'fast';
        const enemy = new Enemy(x, -50, type);
        
        // 根据难度调整敌人属性
        const settings = this.difficultySettings[this.difficulty];
        enemy.speed *= settings.enemySpeed;
        enemy.points = Math.floor(enemy.points * (settings.enemyPoints / 100));
        
        this.enemies.push(enemy);
    }
    
    spawnPowerUp() {
        const x = Math.random() * (this.width - 30);
        const type = Math.random() < 0.5 ? 'health' : 'multiShot';
        this.powerUps.push(new PowerUp(x, -30, type));
    }
    
    checkCollisions() {
        // 子弹碰撞敌人
        this.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (this.isColliding(bullet, enemy)) {
                    // 创建爆炸效果
                    this.createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                    this.playSound('explosion');
                    
                    // 增加分数
                    this.score += enemy.points;
                    
                    // 移除子弹和敌人
                    this.bullets.splice(bulletIndex, 1);
                    this.enemies.splice(enemyIndex, 1);
                    
                    this.updateUI();
                }
            });
        });
        
        // 玩家碰撞敌人
        this.enemies.forEach((enemy, index) => {
            if (this.isColliding(this.player, enemy)) {
                this.createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                this.playSound('explosion');
                this.enemies.splice(index, 1);
                this.lives--;
                this.updateUI();
            }
        });
        
        // 玩家收集道具
        this.powerUps.forEach((powerUp, index) => {
            if (this.isColliding(this.player, powerUp)) {
                this.playSound('powerUp');
                powerUp.apply(this.player, this);
                this.powerUps.splice(index, 1);
            }
        });
    }
    
    createExplosion(x, y) {
        for (let i = 0; i < 10; i++) {
            this.particles.push(new Particle(x, y));
        }
    }
    
    isColliding(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
    
    render() {
        // 清空画布
        this.ctx.fillStyle = '#0a0e17';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // 绘制背景网格
        this.drawGrid();
        
        // 绘制游戏对象
        this.player.draw(this.ctx);
        
        // 绘制粒子效果（在游戏对象下方）
        this.particles.forEach(particle => particle.draw(this.ctx));
        
        // 绘制子弹、敌人和道具
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));
        
        // 绘制暂停提示
        if (this.gameState === 'paused') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('游戏暂停', this.width / 2, this.height / 2);
            this.ctx.font = '24px Arial';
            this.ctx.fillText('按 P 键继续', this.width / 2, this.height / 2 + 50);
        }
        
        // 绘制开始提示
        if (this.gameState === 'menu') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '36px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('点击开始游戏按钮开始', this.width / 2, this.height / 2);
        }
    }
    
    drawGrid() {
        // 绘制科技感网格背景
        const gridSize = 40;
        const time = Date.now() * 0.001;
        
        // 较暗的网格线
        this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
        this.ctx.lineWidth = 1;
        
        // 横线
        for (let y = 0; y < this.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
        
        // 竖线
        for (let x = 0; x < this.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        
        // 随机绘制一些闪烁的点
        this.ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        for (let i = 0; i < 50; i++) {
            const x = Math.floor(Math.random() * this.width / gridSize) * gridSize;
            const y = Math.floor(Math.random() * this.height / gridSize) * gridSize;
            
            // 使用时间和位置创建闪烁效果
            const blink = 0.3 + 0.7 * Math.sin(time + x * 0.01 + y * 0.01);
            
            if (blink > 0.8) {
                this.ctx.globalAlpha = blink - 0.8;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        // 绘制一些移动的数字线（类似矩阵效果）
        this.ctx.font = '10px monospace';
        this.ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
        
        const numDigitalRains = 5;
        for (let i = 0; i < numDigitalRains; i++) {
            // 使用时间和索引生成伪随机位置
            const x = ((i * 157) + Math.sin(time * 0.5) * 100 + this.width) % this.width;
            let speed = 1 + Math.sin(time + i) * 0.5;
            
            for (let j = 0; j < 10; j++) {
                const y = ((time * 50 * speed) + j * 15) % this.height;
                const character = String.fromCharCode(Math.floor(Math.random() * 10) + 48); // 数字
                
                this.ctx.globalAlpha = 0.5 - j * 0.05;
                this.ctx.fillText(character, x, y);
            }
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    gameLoop(currentTime = 0) {
        if (this.gameState === 'playing') {
            const deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;
            
            this.update(deltaTime);
            this.render();
            
            requestAnimationFrame((time) => this.gameLoop(time));
        } else {
            this.render();
        }
    }
    
    playSound(soundName) {
        if (this.soundEnabled && this.sounds[soundName]) {
            try {
                this.sounds[soundName].currentTime = 0;
                this.sounds[soundName].play().catch(error => {
                    console.log('音频播放失败:', error);
                    // 如果播放失败次数过多，禁用音效
                    if (!this.sounds[soundName].playFailCount) {
                        this.sounds[soundName].playFailCount = 1;
                    } else {
                        this.sounds[soundName].playFailCount++;
                        if (this.sounds[soundName].playFailCount > 3) {
                            console.log('音效播放失败次数过多，禁用音效');
                            this.soundEnabled = false;
                            document.getElementById('soundBtn').textContent = '开启音效';
                        }
                    }
                });
            } catch (error) {
                console.log('音频播放出错:', error);
            }
        }
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        document.getElementById('soundBtn').textContent = this.soundEnabled ? '关闭音效' : '开启音效';
    }
}

// 等待DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    try {
        const game = new Game();
        console.log('游戏初始化成功');
    } catch (error) {
        console.error('游戏初始化失败:', error);
        alert('游戏加载出错，请刷新页面重试。错误信息: ' + error.message);
    }
});