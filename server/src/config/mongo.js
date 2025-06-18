import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Replace the mongo db URI in the .env
const URI = process.env.MONGO_URI;
if (!URI) throw new Error("MONGO_URI is not defined.");

const client = new MongoClient(URI);

let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log("MongoDB successfully connected.");
  }
  return db;
}

export function getDB() {
  if (!db) throw new Error("Database not initialized. Call connectDB first.");
  return db;
}

export function closeDB() {
  return client.close();
}
