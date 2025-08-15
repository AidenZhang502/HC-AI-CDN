// pages/api/dbcheck.js
const { MongoClient } = require("mongodb");

// 从 URI 中取数据库名（仅用于显示）
function getDbFromUri(uri) {
  const m = uri.match(/^mongodb(\+srv)?:\/\/[^/]+\/([^?]+)?/i);
  return (m && m[2]) ? m[2] : null;
}

module.exports = async (req, res) => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return res.status(500).json({ ok: false, step: "env", error: "MONGODB_URI not set" });
    }

    const dbName = process.env.MONGODB_DB || getDbFromUri(uri) || "fitness";

    // 尝试真正连一次库
    const client = new MongoClient(uri);
    await client.connect();              // 常见失败点：URI/用户密码/IP白名单/DNS
    const db = client.db(dbName);

    const cols = await db.listCollections().toArray(); // 常见失败点：权限
    await client.close();

    return res.status(200).json({
      ok: true,
      db: dbName,
      uriHasDb: !!getDbFromUri(uri),
      collections: cols.slice(0, 10).map(c => c.name)
    });
  } catch (e) {
    // 关键：把具体错误返回出来，方便定位
    return res.status(500).json({
      ok: false,
      step: "connect_or_list",
      name: e?.name,
      code: e?.code,
      error: e?.message || String(e)
    });
  }
};
