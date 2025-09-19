# Supabase 配置指南

## 1. 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com) 并注册/登录
2. 点击 "New Project" 创建新项目
3. 填写项目信息：
   - Name: 选择项目名称
   - Database Password: 设置数据库密码
   - Region: 选择离您最近的区域

## 2. 获取项目配置信息

1. 在项目控制台中，点击左侧菜单的 "Settings" → "API"
2. 复制以下信息：
   - **Project URL**: 项目的 API 端点
   - **anon public**: 匿名公钥（用于客户端）

## 3. 配置环境变量

创建 `.env.local` 文件（已为您创建模板），并填入实际值：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. 创建数据库表

在 Supabase 控制台的 SQL Editor 中执行以下 SQL：

```sql
-- 创建 flows 表
CREATE TABLE flows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  nodes JSONB NOT NULL,
  edges JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全策略（RLS）
ALTER TABLE flows ENABLE ROW LEVEL SECURITY;

-- 创建允许所有操作的策略（开发环境）
CREATE POLICY "Allow all operations" ON flows
  FOR ALL USING (true) WITH CHECK (true);

-- 创建更新时间的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_flows_updated_at 
    BEFORE UPDATE ON flows 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

## 5. 验证配置

配置完成后，您的应用应该能够：
- 保存流程到 Supabase
- 自动加载最新保存的流程
- 在控制台看到相应的日志信息

## 常见问题

### 1. 连接错误
- 检查 `.env.local` 文件是否在正确位置
- 确认环境变量名称正确（必须以 `NEXT_PUBLIC_` 开头）
- 重启开发服务器

### 2. 数据库操作失败
- 确认已创建 `flows` 表
- 检查 RLS 策略是否正确设置
- 在 Supabase 控制台查看日志

### 3. 权限问题
- 确认使用的是 `anon` 密钥而不是 `service_role` 密钥
- 检查 RLS 策略是否允许当前操作

## 安全建议

生产环境中，建议：
1. 设置更严格的 RLS 策略
2. 实现用户认证
3. 限制匿名用户的操作权限
