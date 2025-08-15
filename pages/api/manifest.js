// pages/api/manifest.js
const { getDb } = require("../../lib/mongodb");

module.exports = async function handler(req, res) {
  try {
    const db = await getDb();
    const col = db.collection("exercises"); // 你在 Atlas 中的集合名

    const { tag, key } = req.query || {};
    const filter = {};
    if (tag) filter.tags = tag;
    if (key) filter.key = key;

    const base = (process.env.CDN_BASE_URL || "").replace(/\/$/, "");
    const docs = await col.find(filter, { projection: { _id: 0 } }).toArray();

    const items = docs.map(d => ({
      key: d.key,
      action: d.action,
      tags: d.tags,
      version: d.version ?? 1,
      type: d.type ?? "zip",
      pack: d.pack,
      url: d.path?.startsWith("http")
        ? d.path
        : `${base}/${(d.path || "").replace(/^\//, "")}`
    }));

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=300");
    res.status(200).json({ count: items.length, items });
  } catch (e) {
    console.error("manifest error:", e);
    res.status(500).json({ error: "internal_error", message: e?.message });
  }
};
