import { connectToDatabase } from '../../lib/mongodb'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { db } = await connectToDatabase()
    const exercises = await db.collection('exercises').find({}).toArray()
    res.json({ success: true, data: exercises })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}