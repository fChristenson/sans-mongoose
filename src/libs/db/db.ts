import { MongoClient, Db } from "mongodb";
const url = "mongodb://localhost:27017";
// Database Name
const defaultDbname = "myproject";

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

export let db: Db;

export const connect = async (dbName: string = defaultDbname) => {
  // Use connect method to connect to the Server
  const conn = await client.connect();
  db = conn.db(dbName);
  return client;
};
