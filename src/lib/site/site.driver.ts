import { FindCursor } from 'mongodb';
import { mongoClient, SchemaDefInterface } from 'lib/core/mongo';
import { Schema, Types } from 'mongoose';
import { Service } from 'typedi';

@Service()
export class SiteDriver implements SchemaDefInterface {
  load(filter?: Map<string, any>): FindCursor {
    return mongoClient().collection('sites').find();
  }

  schema(): Schema {
    return new Schema({
      site_id: Types.ObjectId,
      name: String,
    });
  }

  collectionName(): string {
    return '';
  }

  schemaName(): string {
    return '';
  }
}
