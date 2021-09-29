import { Db, MongoClient } from 'mongodb';

const mongo: {
  db: Db;
} = { db: null };

export async function initDB() {
  try {
    const client = new MongoClient('mongodb://localhost:27017', {
      auth: {
        username: 'mongodb',
        password: 'mongodb',
      },
      servername: 'mongodb',
    });
    await client.connect();
    mongo.db = client.db('local');
    console.log(`Mongo db successfully connected `);
  } catch (e) {
    console.log('Cannot connect to mongodb', e);
    throw e;
  }
}

export default function db(): Db {
  return mongo.db;
}
