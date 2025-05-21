// 创建星空背景
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    // 创建200颗星星
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机大小
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机动画延迟
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        starsContainer.appendChild(star);
    }
}

// 页面加载完成后创建星空
document.addEventListener('DOMContentLoaded', createStars); 