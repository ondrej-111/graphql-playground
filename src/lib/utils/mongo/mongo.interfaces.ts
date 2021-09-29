import { Condition, Filter, ObjectId } from 'mongodb';

export type MongoFilter<TSchema> = Filter<TSchema> & {
  _id?: Condition<ObjectId>;
};
