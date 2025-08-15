// pages/api/dbcheck2.js
module.exports = async (req, res) => {
  const out = { ok: false, steps: [] };

  try {
    out.steps.push("start");

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB || "fitness";
    if (!uri) throw new Error("MONGODB_URI not set");
    out.steps.push("got_env");

    // 把 require 放到 try 里面，这样任何模块加载错误都会被捕获并返回
    const { MongoClient } = require("mongodb");
    out.steps.push("required_mongodb");

    const client = new MongoClient(uri);
    out.steps.push("client_created");

    await client.connect();
    out.steps.push("connected");

    const db = client.db(dbName);
    out.steps.push("db_selected:" + dbName);

    const cols = await db.listCollections().toArray();
    out.steps.push("listed_collections");

    await client.close();
    out.steps.push("client_closed");

    out.ok = true;
    out.db = dbName;
    out.collections = cols.slice(0, 10).map(c => c.name);

    return res.status(200).json(out);
  } catch (e) {
    out.error = e?.message || String(e);
    out.name = e?.name;
    out.code = e?.code;
    return res.status(500).json(out);
  }
};
