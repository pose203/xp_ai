export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ code: 405, message: 'Method Not Allowed' });
    return;
  }

  // 简易鉴权：读取 Authorization 头，未提供也返回演示用户
  const auth = req.headers.authorization || '';
  const user = {
    id: 'u_demo',
    username: 'demo@qiezi.com',
    nickname: '演示用户',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face',
    level: 'Lv.1',
    signature: '这是一个演示账号'
  };

  res.status(200).json({ code: 0, message: '获取用户信息成功', data: user });
}

