<?php
// MySQL连接配置
$servername = "localhost";
$username = "root";          // XAMPP默认用户名
$password = "";              // XAMPP默认密码为空
$dbname = "lesson_db";
$port = "3306";              // 默认MySQL端口

try {
    // 首先尝试连接到MySQL服务器（不指定数据库）
    echo "<h3>正在测试MySQL连接...</h3>";
    
    // 测试基本连接
    $test_pdo = new PDO("mysql:host=$servername;charset=utf8mb4", $username, $password);
    echo "<p style='color: green;'>✓ MySQL服务器连接成功</p>";
    
    // 检查数据库是否存在
    $databases = $test_pdo->query("SHOW DATABASES LIKE '$dbname'")->fetchAll();
    if (empty($databases)) {
        echo "<p style='color: orange;'>⚠ 数据库 '$dbname' 不存在，正在创建...</p>";
        $test_pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        echo "<p style='color: green;'>✓ 数据库 '$dbname' 创建成功</p>";
    } else {
        echo "<p style='color: green;'>✓ 数据库 '$dbname' 已存在</p>";
    }
    
    // 现在连接到指定数据库
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", 
                   $username, $password);
    
    // 设置PDO错误模式为异常
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h2>数据库连接成功！</h2>";
    
    // 查询用户数据
    echo "<h3>用户列表：</h3>";
    $stmt = $pdo->query("SELECT * FROM users");
    
    echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
    echo "<tr><th>ID</th><th>用户名</th><th>邮箱</th><th>创建时间</th></tr>";
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row['id']) . "</td>";
        echo "<td>" . htmlspecialchars($row['username']) . "</td>";
        echo "<td>" . htmlspecialchars($row['email']) . "</td>";
        echo "<td>" . htmlspecialchars($row['created_at']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
    // 查询文章数据（关联查询）
    echo "<h3>文章列表：</h3>";
    $stmt = $pdo->query("
        SELECT p.id, p.title, p.content, u.username, p.created_at 
        FROM posts p 
        JOIN users u ON p.user_id = u.id 
        ORDER BY p.created_at DESC
    ");
    
    echo "<table border='1' style='border-collapse: collapse; width: 100%; margin-top: 20px;'>";
    echo "<tr><th>ID</th><th>标题</th><th>作者</th><th>内容</th><th>创建时间</th></tr>";
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row['id']) . "</td>";
        echo "<td>" . htmlspecialchars($row['title']) . "</td>";
        echo "<td>" . htmlspecialchars($row['username']) . "</td>";
        echo "<td>" . htmlspecialchars(substr($row['content'], 0, 50)) . "...</td>";
        echo "<td>" . htmlspecialchars($row['created_at']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
    // 插入新数据示例
    if ($_POST['action'] ?? '' === 'add_user') {
        $newUsername = $_POST['username'] ?? '';
        $newEmail = $_POST['email'] ?? '';
        $newPassword = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT);
        
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$newUsername, $newEmail, $newPassword]);
        
        echo "<p style='color: green;'>用户添加成功！</p>";
        echo "<script>setTimeout(() => window.location.reload(), 1000);</script>";
    }
    
} catch(PDOException $e) {
    echo "<h2 style='color: red;'>连接失败: " . $e->getMessage() . "</h2>";
    
    // 详细的错误分析
    $errorCode = $e->getCode();
    echo "<h3>错误分析：</h3>";
    
    if ($errorCode == 1045) {
        echo "<div style='background: #ffebee; padding: 15px; border-left: 4px solid #f44336; margin: 10px 0;'>";
        echo "<h4>密码错误解决方案：</h4>";
        echo "<ol>";
        echo "<li><strong>尝试无密码连接：</strong><br>";
        echo "在XAMPP Shell中输入：<code>mysql -u root</code>（不要输入密码）</li>";
        echo "<li><strong>或者输入：</strong><br>";
        echo "<code>mysql -u root -p</code> 然后直接按回车（不输入任何密码）</li>";
        echo "<li><strong>重置XAMPP MySQL：</strong><br>";
        echo "停止MySQL → 点击Config → 选择my.ini → 检查密码配置</li>";
        echo "</ol>";
        echo "</div>";
    } elseif ($errorCode == 2002) {
        echo "<p style='color: red;'>MySQL服务未启动，请在XAMPP控制面板启动MySQL</p>";
    }
    
    echo "<h3>调试信息：</h3>";
    echo "<ul>";
    echo "<li><strong>错误代码：</strong> " . $errorCode . "</li>";
    echo "<li><strong>服务器：</strong> $servername</li>";
    echo "<li><strong>端口：</strong> $port</li>";
    echo "<li><strong>用户名：</strong> $username</li>";
    echo "<li><strong>密码：</strong> " . (empty($password) ? "空" : "已设置") . "</li>";
    echo "</ul>";
    
    echo "<h3>检查清单：</h3>";
    echo "<ol>";
    echo "<li>XAMPP控制面板中MySQL状态是否为'Running'</li>";
    echo "<li>点击MySQL的'Admin'按钮是否能打开phpMyAdmin</li>";
    echo "<li>在XAMPP Shell中尝试: <code>mysql -u root</code></li>";
    echo "<li>如果还是不行，尝试重启XAMPP</li>";
    echo "</ol>";
}
?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MySQL数据库示例</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        table { 
            width: 100%; 
            margin-top: 10px;
            background: white;
        }
        th, td { 
            padding: 12px; 
            text-align: left; 
            border: 1px solid #ddd;
        }
        th { 
            background-color: #4CAF50; 
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .form-container {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        input[type="text"], input[type="email"], input[type="password"] {
            width: 200px;
            padding: 8px;
            margin: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>MySQL数据库操作示例</h1>
        
        <div class="form-container">
            <h3>添加新用户</h3>
            <form method="POST">
                <input type="hidden" name="action" value="add_user">
                <input type="text" name="username" placeholder="用户名" required>
                <input type="email" name="email" placeholder="邮箱" required>
                <input type="password" name="password" placeholder="密码" required>
                <button type="submit">添加用户</button>
            </form>
        </div>
        
        <hr>
        
        <div style="margin-top: 30px;">
            <h3>数据库连接信息：</h3>
            <ul>
                <li><strong>服务器：</strong> localhost</li>
                <li><strong>端口：</strong> 3306</li>
                <li><strong>数据库：</strong> lesson_db</li>
                <li><strong>用户名：</strong> root</li>
                <li><strong>密码：</strong> (空)</li>
            </ul>
        </div>
    </div>
</body>
</html>
