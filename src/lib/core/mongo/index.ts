import mongoose, { Connection, Schema } from 'mongoose';

const mongo: {
  db: Connection;
} = { db: null };

export interface SchemaDefInterface {
  schemaName: () => string;
  schema: () => Schema;
  collectionName: () => string;
}

// const schemas: SchemaDefInterface[] = [SiteDriver];

export async function initDB() {
  try {
    mongo.db = await mongoose.createConnection('mongodb://localhost:27017', {
      user: 'mongodb',
      pass: 'mongodb',
      dbName: 'local',
    });
    // mongoClient.db.collection('users');
    // for (const s of schemas) {
    //   mongoClient.model(s.schemaName(), s.schema(), s.collectionName());
    // }
    console.log(`Mongo db successfully connected `);
  } catch (e) {
    console.log('Cannot connect to mongodb', e);
    throw e;
  } finally {
    console.log('Daco nedobre sa stalo');
  }
}

export function db(): Connection {
  return mongo.db;
}

export { db as mongoClient };
