import turtle as t
import math

# 初始化设置
t.setup(800, 600)
t.speed(0)  # 最快速度
t.bgcolor("black")
t.title("彼岸花 - 曼珠沙华")

# 绘制花瓣函数
def draw_petal(size=80):
    t.color("red")
    t.begin_fill()
    t.circle(size, 60)
    t.left(120)
    t.circle(size, 60)
    t.left(120)
    t.end_fill()

# 绘制花茎
def draw_stem():
    t.penup()
    t.goto(0, -100)
    t.pendown()
    t.setheading(270)  # 朝下
    t.color("green")
    t.pensize(4)
    t.forward(200)
    
    # 添加一些装饰性的叶子
    draw_leaf(30, 20)
    draw_leaf(-30, -70)
    
# 绘制叶子
def draw_leaf(angle, height):
    original_pos = t.position()
    original_heading = t.heading()
    
    t.penup()
    t.goto(0, -100 + height)
    t.setheading(270 + angle)
    t.pendown()
    
    t.color("dark green")
    t.begin_fill()
    t.forward(60)
    t.circle(20, 120)
    t.circle(-20, 120)
    t.forward(60)
    t.end_fill()
    
    t.penup()
    t.goto(original_pos)
    t.setheading(original_heading)
    t.pendown()

# 绘制花茎
draw_stem()

# 绘制花朵
t.penup()
t.goto(0, -100)
t.pendown()
t.left(30)

# 绘制主要花瓣
for _ in range(6):
    draw_petal()
    t.left(60)

# 绘制内层花瓣
t.penup()
t.goto(0, -80)
t.pendown()
t.setheading(0)
for _ in range(6):
    draw_petal(size=50)
    t.left(60)

# 绘制花蕊
t.penup()
t.goto(0, -40)
t.color("gold")
t.dot(40)

# 添加花丝
for i in range(12):
    t.penup()
    t.goto(0, -40)
    t.pendown()
    t.pensize(2)
    t.color("white")
    angle = i * 30
    t.setheading(angle)
    t.forward(30)
    t.dot(5, "gold")

# 结束绘制
t.hideturtle()
t.done()