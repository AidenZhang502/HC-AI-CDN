import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  const db = client.db('fitness')
  return { client, db }
}