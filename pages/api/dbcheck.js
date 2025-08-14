// pages/api/dbcheck.js
const { MongoClient } = require("mongodb");

function getDbNameFromUri(uri) {
  // 解析 mongodb(+srv)://.../<db>?...
  const m = uri.match(/^mongodb(\+srv)?:\/\/[^/]+\/([^?]+)?/i);
  return (m && m[2]) ? m[2] : null;
}

module.exports = async (req, res) => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return res.status(500).json({ ok: false, error: "MONGODB_URI not set" });
    }

    const envDb = process.env.MONGODB_DB || getDbNameFromUri(uri) || "mydb";
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(envDb);

    const cols = await db.listCollections().toArray();
    await client.close();

    return res.status(200).json({
      ok: true,
      uriHasDb: !!getDbNameFromUri(uri),
      db: envDb,
      collections: cols.slice(0, 10).map(c => c.name),
    });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e?.message || String(e),
      stack: e?.stack?.split("\n").slice(0, 3).join(" | ")
    });
  }
};
