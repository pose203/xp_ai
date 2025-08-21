# 6px 字体大小

- 之前浏览器支持的最新字体12px，但需要注意可读性和用户体验

- 



- 1px 像素
   - 来自于移动端
   - 1px 边框过去有点粗，手机比较好，像素密度比大
   - 浏览器不支持小数像素的绘制
   - 伪元素
       方便，content 必须
       定位 专职去做下边框
       transform:scaleY(0.5)
       transform-origin center bottom