import turtle as t
import math
import random

# 设置窗口
t.setup(800, 800)
t.bgcolor("black")
t.title("彼岸花 - 高级绘图版")
t.tracer(0, 0)  # 关闭动画绘制，提高速度

# 颜色定义
RED_COLORS = ["#ff0000", "#ff3333", "#ff6666", "#ff4444", "#cc0000", "#990000"]
GREEN_COLORS = ["#006600", "#008800", "#00aa00", "#007700"]
GOLDEN_COLORS = ["#ffcc00", "#ffdd33", "#ffee66"]

# 绘制花茎
def draw_stem():
    t.penup()
    t.goto(0, -200)
    t.pendown()
    t.setheading(90)  # 向上
    t.pensize(5)
    
    stem_length = 300
    curve_factor = 20
    
    for i in range(stem_length):
        # 茎略微弯曲
        angle = math.sin(i/30) * 3
        t.seth(90 + angle)
        
        # 渐变色茎
        green_index = i / stem_length
        r = int(30 + green_index * 50)
        g = int(100 + green_index * 60)
        b = int(30 + green_index * 10)
        t.pencolor(r/255, g/255, b/255)
        
        t.forward(1)
        
        # 随机分支
        if i > 150 and i % 50 == 0:
            draw_branch(i)
    
    t.update()

# 绘制花茎分支
def draw_branch(height):
    pos = t.position()
    heading = t.heading()
    
    # 随机选择分支方向和长度
    branch_dir = random.choice([-1, 1])  # 左或右
    branch_angle = random.randint(30, 60) * branch_dir
    branch_length = random.randint(30, 60)
    
    t.setheading(heading + branch_angle)
    
    # 绘制分支
    t.pensize(2)
    t.color(random.choice(GREEN_COLORS))
    
    for i in range(branch_length):
        # 分支也略微弯曲
        curve = math.sin(i/10) * 5
        t.setheading(heading + branch_angle + curve)
        t.forward(1)
    
    # 在分支末端绘制叶子
    draw_leaf()
    
    # 返回主茎
    t.penup()
    t.goto(pos)
    t.setheading(heading)
    t.pensize(5)
    t.pendown()

# 绘制叶子
def draw_leaf():
    t.pensize(1)
    leaf_size = random.randint(15, 25)
    
    # 渐变色叶子
    t.color(random.choice(GREEN_COLORS))
    t.begin_fill()
    
    # 绘制叶子的一边
    for i in range(leaf_size):
        t.forward(1)
        t.right(2)
    
    t.right(40)
    
    # 绘制叶子的另一边
    for i in range(leaf_size):
        t.forward(1)
        t.right(2)
    
    t.end_fill()
    t.update()

# 绘制单个花瓣
def draw_petal(petal_size, inner=False):
    color = random.choice(RED_COLORS)
    t.color(color)
    t.begin_fill()
    
    # 使用贝塞尔曲线创建自然的花瓣形状
    petal_width = petal_size * 0.4
    
    # 绘制花瓣右侧
    for i in range(petal_size):
        ratio = i / petal_size
        dx = 4 * math.sin(ratio * math.pi)
        t.goto(t.xcor() + 1, t.ycor() + dx)
    
    # 绘制花瓣尖端
    t.right(40)
    
    # 绘制花瓣左侧
    for i in range(petal_size):
        ratio = i / petal_size
        dx = 4 * math.sin(ratio * math.pi)
        t.goto(t.xcor() - 1, t.ycor() - dx)
    
    t.end_fill()
    t.update()

# 绘制整朵花
def draw_flower():
    # 绘制主花瓣
    num_petals = 7
    t.penup()
    t.goto(0, 100)
    
    for i in range(num_petals):
        t.penup()
        t.goto(0, 100)
        t.setheading(i * (360 / num_petals))
        t.pendown()
        
        # 调整花瓣大小和形状
        petal_size = random.randint(70, 90)
        draw_petal(petal_size)
    
    # 绘制内层花瓣
    for i in range(num_petals):
        t.penup()
        t.goto(0, 100)
        t.setheading(i * (360 / num_petals) + 360/(num_petals*2))
        t.pendown()
        
        petal_size = random.randint(50, 60)
        draw_petal(petal_size, inner=True)
    
    # 绘制花蕊
    draw_stamen()
    t.update()

# 绘制花蕊和花丝
def draw_stamen():
    t.penup()
    t.goto(0, 100)
    t.pendown()
    
    # 绘制花蕊中心
    t.dot(25, random.choice(GOLDEN_COLORS))
    
    # 绘制花丝
    num_stamen = 12
    for i in range(num_stamen):
        t.penup()
        t.goto(0, 100)
        t.setheading(i * (360 / num_stamen))
        t.pendown()
        
        t.pensize(2)
        t.color(random.choice(GOLDEN_COLORS))
        t.forward(random.randint(15, 25))
        t.dot(5)
    
    t.update()

# 添加一些装饰性背景效果
def draw_background():
    t.penup()
    
    # 画点点星光
    for _ in range(100):
        x = random.randint(-400, 400)
        y = random.randint(-400, 400)
        
        # 避开花的区域
        if abs(x) < 150 and y > -50 and y < 250:
            continue
            
        t.goto(x, y)
        size = random.random() * 3
        brightness = random.random() * 0.5 + 0.5
        t.dot(size, (brightness, brightness, brightness))
    
    t.update()

# 主函数
def main():
    # 绘制顺序很重要
    draw_background()
    draw_stem()
    draw_flower()
    
    # 添加标题
    t.penup()
    t.goto(0, -350)
    t.color("#ff5555")
    t.write("彼岸花 - 曼珠沙华", align="center", font=("Arial", 24, "bold"))
    
    t.hideturtle()
    t.update()
    t.done()

# 执行程序
if __name__ == "__main__":
    main() 