export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ code: 405, message: 'Method Not Allowed' });
    return;
  }

  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      res.status(400).json({ code: 400, message: '用户名或密码不能为空' });
      return;
    }

    // 简化：直接签发一个演示 token 与用户信息（无持久化）
    const token = `demo-token-${Date.now()}`;
    const user = {
      id: 'u_demo',
      username: username,
      nickname: username,
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face',
      level: 'Lv.1',
      signature: '欢迎使用遇见~'
    };

    res.status(200).json({ code: 0, message: '登录成功', data: { token, user } });
  } catch (e) {
    res.status(500).json({ code: 500, message: '服务器错误', error: String(e?.message || e) });
  }
}

