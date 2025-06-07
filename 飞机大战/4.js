// 玩家飞机类
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 80;
        this.speed = 5;
        this.shootCooldown = 0;
        this.multiShot = false;
        this.multiShotTimer = 0;
    }
    
    update(keys) {
        // 移动控制
        if ((keys['a'] || keys['ArrowLeft']) && this.x > 0) {
            this.x -= this.speed;
        }
        if ((keys['d'] || keys['ArrowRight']) && this.x < 800 - this.width) {
            this.x += this.speed;
        }
        if ((keys['w'] || keys['ArrowUp']) && this.y > 0) {
            this.y -= this.speed;
        }
        if ((keys['s'] || keys['ArrowDown']) && this.y < 600 - this.height) {
            this.y += this.speed;
        }
        
        // 更新射击冷却
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }
        
        // 更新多重射击时间
        if (this.multiShotTimer > 0) {
            this.multiShotTimer--;
            if (this.multiShotTimer <= 0) {
                this.multiShot = false;
            }
        }
    }
    
    shoot(bullets) {
        if (this.shootCooldown <= 0) {
            if (this.multiShot) {
                // 三连发
                bullets.push(new Bullet(this.x + this.width / 2 - 3, this.y, -8));
                bullets.push(new Bullet(this.x + this.width / 2 - 3, this.y, -8, -2));
                bullets.push(new Bullet(this.x + this.width / 2 - 3, this.y, -8, 2));
            } else {
                // 单发
                bullets.push(new Bullet(this.x + this.width / 2 - 3, this.y, -8));
            }
            this.shootCooldown = 10;
        }
    }
    
    draw(ctx) {
        // 绘制科技感飞机
        ctx.save();
        
        // 主体轮廓发光效果
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 15;
        
        // 飞机主体
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(this.x + 30, this.y);
        ctx.lineTo(this.x + 10, this.y + 30);
        ctx.lineTo(this.x + 20, this.y + 70);
        ctx.lineTo(this.x + 40, this.y + 70);
        ctx.lineTo(this.x + 50, this.y + 30);
        ctx.closePath();
        ctx.fill();
        
        // 关闭发光效果
        ctx.shadowBlur = 0;
        
        // 内部细节
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.moveTo(this.x + 30, this.y + 10);
        ctx.lineTo(this.x + 20, this.y + 30);
        ctx.lineTo(this.x + 30, this.y + 60);
        ctx.lineTo(this.x + 40, this.y + 30);
        ctx.closePath();
        ctx.fill();
        
        // 机翼
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 40);
        ctx.lineTo(this.x + 20, this.y + 30);
        ctx.lineTo(this.x + 20, this.y + 50);
        ctx.lineTo(this.x + 5, this.y + 50);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(this.x + 60, this.y + 40);
        ctx.lineTo(this.x + 40, this.y + 30);
        ctx.lineTo(this.x + 40, this.y + 50);
        ctx.lineTo(this.x + 55, this.y + 50);
        ctx.closePath();
        ctx.fill();
        
        // 推进器
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(this.x + 25, this.y + 70, 10, 5);
        
        // 推进器粒子效果
        if (Math.random() > 0.5) {
            ctx.fillStyle = '#38bdf8';
            ctx.globalAlpha = Math.random() * 0.7 + 0.3;
            ctx.beginPath();
            ctx.moveTo(this.x + 25, this.y + 75);
            ctx.lineTo(this.x + 35, this.y + 75);
            ctx.lineTo(this.x + 30, this.y + 85 + Math.random() * 10);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        
        // 如果有多重射击效果，绘制能量场
        if (this.multiShot) {
            // 能量场
            const gradient = ctx.createRadialGradient(
                this.x + this.width / 2, this.y + this.height / 2, 10,
                this.x + this.width / 2, this.y + this.height / 2, 40
            );
            gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
            gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.3)');
            gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 40, 0, Math.PI * 2);
            ctx.fill();
            
            // 能量场边缘
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 40, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        // 飞机驾驶舱
        ctx.fillStyle = '#7dd3fc';
        ctx.beginPath();
        ctx.ellipse(this.x + 30, this.y + 25, 8, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // 驾驶舱高光
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.ellipse(this.x + 28, this.y + 20, 3, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// 子弹类
class Bullet {
    constructor(x, y, speedY, speedX = 0) {
        this.x = x;
        this.y = y;
        this.width = 6;
        this.height = 15;
        this.speedY = speedY;
        this.speedX = speedX;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
    }
    
    draw(ctx) {
        ctx.save();
        
        // 激光束效果
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
        gradient.addColorStop(0, '#38bdf8');
        gradient.addColorStop(0.5, '#e0f2fe');
        gradient.addColorStop(1, '#38bdf8');
        
        // 光束核心
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 2);
        ctx.fill();
        
        // 光束轨迹
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y + this.height - 5, this.width, 10 + Math.random() * 5, 2);
        ctx.fill();
        
        // 光束头部的闪光
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#f0f9ff';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// 敌人飞机类
class Enemy {
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        if (type === 'normal') {
            this.width = 50;
            this.height = 60;
            this.speed = 2;
            this.points = 100;
            this.color = '#F44336';
        } else if (type === 'fast') {
            this.width = 40;
            this.height = 50;
            this.speed = 4;
            this.points = 200;
            this.color = '#9C27B0';
        }
    }
    
    update() {
        this.y += this.speed;
    }
    
    draw(ctx) {
        ctx.save();
        
        // 敌机发光轮廓
        const glowColor = this.type === 'fast' ? '#a855f7' : '#ef4444';
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10;
        
        // 敌机主体
        const mainColor = this.type === 'fast' ? '#7e22ce' : '#b91c1c';
        ctx.fillStyle = mainColor;
        
        // 六边形机身
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width * 0.8, this.y + this.height * 0.2);
        ctx.lineTo(this.x + this.width * 0.8, this.y + this.height * 0.7);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x + this.width * 0.2, this.y + this.height * 0.7);
        ctx.lineTo(this.x + this.width * 0.2, this.y + this.height * 0.2);
        ctx.closePath();
        ctx.fill();
        
        // 关闭发光
        ctx.shadowBlur = 0;
        
        // 敌机内部
        const secondaryColor = this.type === 'fast' ? '#9333ea' : '#dc2626';
        ctx.fillStyle = secondaryColor;
        
        // 内部六边形
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y + this.height * 0.2);
        ctx.lineTo(this.x + this.width * 0.7, this.y + this.height * 0.3);
        ctx.lineTo(this.x + this.width * 0.7, this.y + this.height * 0.6);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height * 0.8);
        ctx.lineTo(this.x + this.width * 0.3, this.y + this.height * 0.6);
        ctx.lineTo(this.x + this.width * 0.3, this.y + this.height * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // 中央能源核心
        const coreColor = this.type === 'fast' ? '#c4b5fd' : '#fca5a5';
        ctx.fillStyle = coreColor;
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height * 0.4, this.width * 0.12, 0, Math.PI * 2);
        ctx.fill();
        
        // 能源核心发光
        ctx.shadowColor = this.type === 'fast' ? '#a855f7' : '#ef4444';
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.7 + Math.sin(Date.now() * 0.01) * 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // 机翼
        ctx.shadowBlur = 5;
        ctx.fillStyle = mainColor;
        
        // 左机翼
        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 0.2, this.y + this.height * 0.3);
        ctx.lineTo(this.x, this.y + this.height * 0.3);
        ctx.lineTo(this.x - this.width * 0.1, this.y + this.height * 0.5);
        ctx.lineTo(this.x, this.y + this.height * 0.6);
        ctx.lineTo(this.x + this.width * 0.2, this.y + this.height * 0.6);
        ctx.closePath();
        ctx.fill();
        
        // 右机翼
        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 0.8, this.y + this.height * 0.3);
        ctx.lineTo(this.x + this.width, this.y + this.height * 0.3);
        ctx.lineTo(this.x + this.width * 1.1, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width, this.y + this.height * 0.6);
        ctx.lineTo(this.x + this.width * 0.8, this.y + this.height * 0.6);
        ctx.closePath();
        ctx.fill();
        
        // 引擎
        ctx.shadowBlur = 0;
        ctx.fillStyle = this.type === 'fast' ? '#a855f7' : '#ef4444';
        
        // 左引擎
        ctx.fillRect(this.x + this.width * 0.3, this.y + this.height * 0.8, this.width * 0.1, this.height * 0.2);
        
        // 右引擎
        ctx.fillRect(this.x + this.width * 0.6, this.y + this.height * 0.8, this.width * 0.1, this.height * 0.2);
        
        // 引擎光效
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = this.type === 'fast' ? '#d8b4fe' : '#fecaca';
        ctx.beginPath();
        ctx.arc(this.x + this.width * 0.35, this.y + this.height, this.width * 0.1, 0, Math.PI);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x + this.width * 0.65, this.y + this.height, this.width * 0.1, 0, Math.PI);
        ctx.fill();
        
        ctx.restore();
    }
}

// 道具类
class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 2;
        this.type = type;
        this.rotation = 0;
    }
    
    update() {
        this.y += this.speed;
        this.rotation += 0.1;
    }
    
    apply(player, game) {
        if (this.type === 'health') {
            game.lives++;
        } else if (this.type === 'multiShot') {
            player.multiShot = true;
            player.multiShotTimer = 600; // 10秒
        }
        game.updateUI();
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // 全息悬浮效果
        const time = Date.now() * 0.003;
        const floatOffset = Math.sin(time) * 2;
        
        // 发光效果
        ctx.shadowBlur = 10;
        
        if (this.type === 'health') {
            // 能量修复模块
            ctx.shadowColor = '#06b6d4';
            
            // 外部六边形
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2;
            ctx.setLineDash([1, 1]);
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = i * Math.PI / 3;
                const x = Math.cos(angle) * 15;
                const y = Math.sin(angle) * 15;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            
            // 内部核心
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
            gradient.addColorStop(0, '#cffafe');
            gradient.addColorStop(0.5, '#0891b2');
            gradient.addColorStop(1, '#164e63');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // 十字图标
            ctx.fillStyle = '#ecfeff';
            ctx.fillRect(-6, -2, 12, 4);
            ctx.fillRect(-2, -6, 4, 12);
            
            // 脉冲效果
            ctx.globalAlpha = 0.5 * (1 + Math.sin(time * 5));
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.arc(0, 0, 12 + floatOffset, 0, Math.PI * 2);
            ctx.stroke();
            
        } else if (this.type === 'multiShot') {
            // 武器升级模块
            ctx.shadowColor = '#8b5cf6';
            
            // 外部八边形
            ctx.strokeStyle = '#8b5cf6';
            ctx.lineWidth = 2;
            ctx.setLineDash([1, 1]);
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = i * Math.PI / 4;
                const x = Math.cos(angle) * 15;
                const y = Math.sin(angle) * 15;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            
            // 内部核心
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
            gradient.addColorStop(0, '#ddd6fe');
            gradient.addColorStop(0.5, '#7c3aed');
            gradient.addColorStop(1, '#4c1d95');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // 三角形图标（射击符号）
            ctx.fillStyle = '#ede9fe';
            ctx.beginPath();
            ctx.moveTo(-6, 4);
            ctx.lineTo(6, 4);
            ctx.lineTo(0, -6);
            ctx.closePath();
            ctx.fill();
            
            // 能量环绕效果
            ctx.globalAlpha = 0.7;
            ctx.strokeStyle = '#a78bfa';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.ellipse(0, 0, 10 + floatOffset, 15, time % (Math.PI * 2), 0, Math.PI * 2);
            ctx.stroke();
            
            // 反向旋转的能量环
            ctx.beginPath();
            ctx.ellipse(0, 0, 15, 10 + floatOffset, -time % (Math.PI * 2), 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // 悬浮粒子
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = this.type === 'health' ? '#22d3ee' : '#a78bfa';
        
        for (let i = 0; i < 3; i++) {
            const angle = (time + i * Math.PI * 2 / 3) % (Math.PI * 2);
            const distance = 15 + Math.sin(time * 3 + i) * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const size = 1 + Math.sin(time * 2 + i) * 0.5;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

// 粒子效果类
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 60;
        this.maxLife = 60;
        this.size = Math.random() * 3 + 1;
        
        // 科技感颜色
        const colors = [
            '#0ea5e9', // 蓝色
            '#38bdf8', // 亮蓝色
            '#3b82f6', // 主蓝色
            '#8b5cf6', // 紫色
            '#a78bfa', // 亮紫色
            '#06b6d4'  // 青色
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // 特殊形状选择
        this.shape = Math.random() > 0.7 ? 'square' : 'circle';
        
        // 旋转参数
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.life--;
        this.rotation += this.rotationSpeed;
    }
    
    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // 发光效果
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (this.shape === 'square') {
            // 正方形粒子
            const size = this.size * 0.8;
            ctx.fillRect(-size / 2, -size / 2, size, size);
            
            // 数据线效果
            if (Math.random() > 0.7) {
                ctx.fillRect(-size, 0, size * 2, 1);
                ctx.fillRect(0, -size, 1, size * 2);
            }
        } else {
            // 圆形粒子
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // 闪光效果
            if (Math.random() > 0.8) {
                ctx.globalAlpha = alpha * 0.7;
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.restore();
    }
}