// pages/api/dbcheck.js
const { getDb } = require("../../lib/mongodb");

module.exports = async function handler(req, res) {
  try {
    const db = await getDb();
    const cols = await db.listCollections().toArray();
    res.status(200).json({
      ok: true,
      db: db.databaseName,
      collections: cols.slice(0, 5).map(c => c.name),
    });
  } catch (e) {
    console.error("dbcheck error:", e);
    res.status(500).json({ ok: false, error: e?.message || "connect_fail" });
  }
};
