export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ code: 405, message: 'Method Not Allowed' });
    return;
  }

  const token = `demo-token-${Date.now()}`;
  res.status(200).json({ code: 0, message: '刷新Token成功', data: { token } });
}

