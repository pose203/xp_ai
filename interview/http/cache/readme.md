# 缓存（Cache）

## URL输入到页面显示
- 知识体系
- 多进程多线程架构是前提
- 补全url
- 输入网址，并解析
   非结构字符串，搜索关键字
   有结构的字符串
   协议://域名:端口/path/:params?qs#hash
   http(s)
   web 80 nginx proxy 3000
   443 https
- 浏览器解析协议、主机、端口、路径等，并**构造**一个http请求
    - 发送请求前，根据请求头的expires 和 cache-control 判断是否命中强缓存策略
      https://www.baidu.com/index.js + 请求头
      缓存文件 + 请求头在一起 (文件的属性一样)
    - 强缓存
      Expires 过期时间 http 1.0 缺点是用户时间不准
      响应头cache-control + 文件本地缓存，在过期时间范围内，不用请求5
      直接用本地缓存内容。http1.1 升级为 Cache-Control
    - 协商缓存
      强缓存没有命中，这个资源在服务器端也不一定修改了，怎么样对一下
      

   cookie
   URL 背后的 请求行、请求头、请求体
   同一主机的不同端口，对应的是不同的程序或服务
   dns -> ip 地址 80 -> http 443 https 3306 mysql
   - 补全url
   比如输入的是baidu.com
   - http://www.baidu.com 不安全
     307 跳转 307 Temporary Redirect
     location:https://www.baidu.com
     再请求一次
     301 永久跳转
     GET请求 302 临时跳转
     307 临时跳转
     308 Permanent Redirect

     301/302 只支持GET，哪怕你的请求不是GET，也会改成GET
     307/308 支持各种方法，不会改



## 什么是HTTP缓存
HTTP缓存是一种存储网络资源副本的技术，当再次需要这些资源时，可以直接从缓存中获取，而不需要重新向服务器请求。

## 缓存的好处
- **减少网络延迟**：从本地缓存读取比网络请求快
- **减少带宽消耗**：避免重复下载相同资源
- **减轻服务器负载**：减少服务器处理请求的压力
- **提升用户体验**：页面加载更快

## 缓存位置
### 1. 浏览器缓存
- **内存缓存（Memory Cache）**：存储在内存中，速度最快，关闭页面后失效
- **磁盘缓存（Disk Cache）**：存储在硬盘中，持久化存储

### 2. 代理服务器缓存
- CDN缓存
- 企业代理缓存

### 3. 网关缓存
- 反向代理缓存（如Nginx）

## 缓存策略

### 强缓存（Strong Cache）
浏览器直接从本地缓存读取资源，不与服务器通信。

#### Expires（HTTP/1.0）
```http
Expires: Wed, 21 Oct 2025 07:28:00 GMT
```
- 绝对时间，容易受客户端时间影响
- 已被Cache-Control替代

#### Cache-Control（HTTP/1.1）
```http
Cache-Control: max-age=3600
```

**主要指令：**
- `max-age=<seconds>`：缓存有效期（秒）
- `no-cache`：需要验证缓存
- `no-store`：不缓存任何内容
- `public`：可被任何缓存存储
- `private`：只能被浏览器缓存
- `must-revalidate`：缓存过期后必须验证

### 协商缓存（Negotiation Cache）
缓存过期后，浏览器向服务器验证资源是否更新。

#### Last-Modified / If-Modified-Since
```http
# 服务器响应
Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT

# 浏览器请求
If-Modified-Since: Wed, 21 Oct 2024 07:28:00 GMT
```

#### ETag / If-None-Match
```http
# 服务器响应
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# 浏览器请求
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

**ETag优势：**
- 更精确的变化检测
- 解决Last-Modified的1秒精度问题
- 避免时间不同步问题

## 缓存流程

```
请求资源
    ↓
检查强缓存
    ↓
有效? → 是 → 直接使用缓存
    ↓ 否
发起协商缓存请求
    ↓
服务器验证
    ↓
304(未修改) → 使用缓存
    ↓
200(已修改) → 返回新资源并缓存
```

## 实际应用场景

### 1. 静态资源缓存策略
```http
# HTML文件 - 不缓存或短时间缓存
Cache-Control: no-cache

# CSS/JS文件 - 长时间缓存 + 文件名hash
Cache-Control: max-age=31536000  # 1年

# 图片资源 - 中等时间缓存
Cache-Control: max-age=2592000   # 30天
```

### 2. API接口缓存
```http
# 用户信息 - 短时间缓存
Cache-Control: max-age=300       # 5分钟

# 配置信息 - 长时间缓存
Cache-Control: max-age=3600      # 1小时
```

## 缓存失效策略

### 1. 版本控制
```html
<link rel="stylesheet" href="style.css?v=1.0.1">
<script src="app.js?v=1.0.1"></script>
```

### 2. 文件名Hash
```html
<link rel="stylesheet" href="style.a1b2c3.css">
<script src="app.d4e5f6.js"></script>
```

### 3. 手动清除
```javascript
// 强制刷新（Ctrl+F5）
location.reload(true);

// 清除特定缓存
if ('caches' in window) {
  caches.delete('my-cache');
}
```

## 缓存调试

### Chrome DevTools
1. Network面板查看缓存状态
   - `(disk cache)` - 磁盘缓存
   - `(memory cache)` - 内存缓存
   - `304` - 协商缓存命中

2. Application面板管理缓存
   - 查看Storage
   - 清除缓存数据

### 常用命令
```bash
# 清除DNS缓存
ipconfig /flushdns

# 禁用缓存的请求
curl -H "Cache-Control: no-cache" http://example.com
```

## 最佳实践

### 1. 缓存策略设计
- **HTML**: `no-cache` 或 `max-age=0`
- **CSS/JS**: `max-age=31536000` + 版本号
- **图片**: `max-age=2592000`

### 2. 服务器配置示例

#### Nginx配置
```nginx
location ~* \.(css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(jpg|jpeg|png|gif)$ {
    expires 30d;
    add_header Cache-Control "public";
}

location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

#### Express.js配置
```javascript
app.use('/static', express.static('public', {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));
```

### 3. 缓存优化技巧
- 合理设置缓存时间
- 使用CDN加速
- 启用Gzip压缩
- 资源文件版本化
- 关键资源预加载

## 面试常见问题

1. **强缓存和协商缓存的区别？**
2. **ETag和Last-Modified哪个优先级更高？**
3. **如何避免缓存带来的更新问题？**
4. **no-cache和no-store的区别？**
5. **如何设计一个合理的缓存策略？**