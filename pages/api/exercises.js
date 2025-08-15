// pages/api/exercises.js
import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const uri = process.env.MONGODB_URI
    const dbName = process.env.MONGODB_DB || "fitness"
    
    if (!uri) {
      throw new Error("MONGODB_URI not set")
    }

    const client = new MongoClient(uri)
    await client.connect()
    
    const db = client.db(dbName)
    const exercises = await db.collection('exercises').find({}).toArray()
    
    await client.close()
    
    res.json({ success: true, data: exercises })
  } catch (error) {
    console.error("exercises API error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
}