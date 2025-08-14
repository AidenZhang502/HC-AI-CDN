// pages/api/envtest.js
export default function handler(req, res) {
  const uri = process.env.MONGODB_URI || null;
  const db  = process.env.MONGODB_DB || null;
  const cdn = process.env.CDN_BASE_URL || null;

  // 只返回“是否存在”，避免泄露敏感值
  const have = {
    MONGODB_URI: !!uri,
    MONGODB_DB: !!db,
    CDN_BASE_URL: !!cdn,
  };

  // 尝试从 URI 提取库名（不含用户名/密码）
  let dbInUri = null;
  if (uri) {
    const m = uri.match(/^mongodb(\+srv)?:\/\/[^/]+\/([^?]+)?/i);
    dbInUri = m && m[2] ? m[2] : null;
  }

  res.status(200).json({ ok: true, have, dbEnv: db, dbInUri });
}
