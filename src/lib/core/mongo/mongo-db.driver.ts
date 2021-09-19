import { FindCursor } from 'mongodb';
import { Connection, Model, Schema, Types } from 'mongoose';
import { SiteEntity } from 'lib/site/site.entity';
import { mongoClient } from 'lib/core/mongo/index';

export abstract class MongoDbDriverAbstract<E extends SiteEntity> {
  async load(): Promise<FindCursor> {
    return mongoClient().collection('sites').find();
  }

  abstract collection(): string;

  abstract model(client: Connection): Model<E>;

  schema(): Schema {
    return new Schema({
      site_id: Types.ObjectId,
      name: String,
    });
  }
}
