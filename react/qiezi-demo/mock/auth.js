// JWT认证 mock接口
import jwt from 'jsonwebtoken';

// JWT密钥
const secret = 'qiezi-demo-jwt-secret-key';



// 模拟用户数据
const users = [
  {
    id: '001',
    username: 'admin',
    password: '123456',
    email: 'admin@qiezi.com',
    nickname: 'admin',
    avatar: 'https://picsum.photos/200/200?random=1',
    role: 'admin',
    totalLikes: 1234,
    following: 56,
    followers: 789,
    signature: '遇见最美好的自己',
    level: 'Lv.10'
  },
  {
    id: '002', 
    username: 'user',
    password: '123456',
    email: 'user@qiezi.com',
    nickname: 'user',
    avatar: 'https://picsum.photos/200/200?random=2',
    role: 'user',
    totalLikes: 123,
    following: 12,
    followers: 34,
    signature: '喜欢记录生活的美好瞬间',
    level: 'Lv.3'
  }
];

export default [
  // 用户登录接口
  {
    url: '/api/auth/login',
    method: 'post',
    timeout: 1000,
    response: (req, res) => {
      const { username, password } = req.body;
      
      // 查找用户
      const user = users.find(u => u.username === username || u.email === username);
      
      if (!user || user.password !== password) {
        return {
          code: 1,
          message: '用户名或密码错误',
          data: null
        };
      }
      
      // 生成JWT token
      const token = jwt.sign(
        {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            nickname: user.nickname,
            avatar: user.avatar,
            role: user.role,
            totalLikes: user.totalLikes,
            following: user.following,
            followers: user.followers,
            signature: user.signature,
            level: user.level
          }
        },
        secret,
        { expiresIn: '7d' } // 7天过期
      );
      
      // 返回用户信息（不包含密码）
      const { password: _, ...userInfo } = user;
      
      return {
        code: 0,
        message: '登录成功',
        data: {
          token,
          user: userInfo
        }
      };
    }
  },
  
  // 获取用户信息接口
  {
    url: '/api/auth/user',
    method: 'get',
    response: (req, res) => {
      const authorization = req.headers['authorization'];
      
      if (!authorization) {
        return {
          code: 401,
          message: '未提供认证令牌',
          data: null
        };
      }
      
      const token = authorization.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, secret);
        
        return {
          code: 0,
          message: '获取用户信息成功',
          data: decoded.user
        };
      } catch (error) {
        return {
          code: 401,
          message: 'Token无效或已过期',
          data: null
        };
      }
    }
  },
  
  // 用户注册接口
  {
    url: '/api/auth/register',
    method: 'post',
    timeout: 1000,
    response: (req, res) => {
      const { username, email, password, nickname } = req.body;
      
      // 检查用户是否已存在
      const existingUser = users.find(u => u.username === username || u.email === email);
      
      if (existingUser) {
        return {
          code: 1,
          message: '用户名或邮箱已存在',
          data: null
        };
      }
      
      // 创建新用户
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        nickname: username,
        avatar: `https://picsum.photos/200/200?random=${Date.now()}`,
        role: 'user',
        totalLikes: 0,
        following: 0,
        followers: 0,
        signature: '这个用户很懒，还没有设置签名',
        level: 'Lv.1'
      };
      
      users.push(newUser);
      
      // 生成JWT token
      const token = jwt.sign(
        {
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            nickname: newUser.nickname,
            avatar: newUser.avatar,
            role: newUser.role,
            totalLikes: newUser.totalLikes,
            following: newUser.following,
            followers: newUser.followers,
            signature: newUser.signature,
            level: newUser.level
          }
        },
        secret,
        { expiresIn: '7d' }
      );
      
      // 返回用户信息（不包含密码）
      const { password: _, ...userInfo } = newUser;
      
      return {
        code: 0,
        message: '注册成功',
        data: {
          token,
          user: userInfo
        }
      };
    }
  },
  
  // 刷新token接口
  {
    url: '/api/auth/refresh',
    method: 'post',
    response: (req, res) => {
      const authorization = req.headers['authorization'];
      
      if (!authorization) {
        return {
          code: 401,
          message: '未提供认证令牌',
          data: null
        };
      }
      
      const token = authorization.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, secret);
        
        // 生成新的token
        const newToken = jwt.sign(
          { user: decoded.user },
          secret,
          { expiresIn: '7d' }
        );
        
        return {
          code: 0,
          message: '刷新Token成功',
          data: {
            token: newToken,
            user: decoded.user
          }
        };
      } catch (error) {
        return {
          code: 401,
          message: 'Token无效或已过期',
          data: null
        };
      }
    }
  }
];