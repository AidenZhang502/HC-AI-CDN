// lib/mongodb.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

let clientPromise;
if (!global._mongoClientPromise) {
  const client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

async function getDb() {
  const conn = await clientPromise;
  const dbName =
    process.env.MONGODB_DB ||
    (new URL(uri).pathname?.slice(1) || "mydb");
  return conn.db(dbName);
}

module.exports = { getDb };
