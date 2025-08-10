export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ code: 405, message: 'Method Not Allowed' });
    return;
  }

  const apiKey = process.env.VITE_ARK_API_KEY;
  if (!apiKey) {
    res.status(500).json({ code: 500, message: 'Missing VITE_ARK_API_KEY in env' });
    return;
  }

  try {
    const upstream = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
    const upstreamRes = await fetch(upstream, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body || {}),
    });

    const data = await upstreamRes.json().catch(() => ({}));

    if (!upstreamRes.ok) {
      res
        .status(502)
        .json({ code: 502, message: `Upstream error: ${upstreamRes.status}`, data });
      return;
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ code: 500, message: 'Proxy error', error: String(e?.message || e) });
  }
}

