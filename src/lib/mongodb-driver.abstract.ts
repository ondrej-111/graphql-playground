import db from 'lib/utils/mongo';
import { EntityInterface } from 'lib/entities/entity.interfaces';
import { Filter, ObjectId } from 'mongodb';
import { MongoFilter } from 'lib/utils/mongo/mongo.interfaces';

export abstract class MongoDbDriverAbstract<E extends EntityInterface> {
  async processQuery<Q>(q: Promise<Q>): Promise<Q> {
    try {
      return await q;
    } catch (e) {
      console.error('[MONGO_ERROR]', e);
      throw e;
    }
  }

  load(filters?: Map<string, any>): Promise<E[]> {
    return this.processQuery<E[]>(
      db()
        .collection<E>(this.collection)
        .find(this.buildFilters(filters))
        .toArray(),
    );
  }

  buildFilters(filters?: Map<string, any>): Filter<E> {
    let filter = undefined;
    if (filters && filters.size) {
      filter = {};
      for (const [key, value] of Array.from(filters)) {
        this.buildFilter(filter, key, value);
      }
    }
    return filter;
  }

  buildDefaultFilter(
    filter: MongoFilter<E>,
    key: '_id',
    value: any,
  ): MongoFilter<E> {
    switch (key) {
      case '_id':
        filter['_id'] = Array.isArray(value)
          ? { $in: value.map((v) => new ObjectId(v)) }
          : new ObjectId(value);
    }
    return filter;
  }

  save(e: E): Promise<E> {
    return e.identifier ? this.update(e) : this.insert(e);
  }

  async insert(e: E): Promise<E> {
    const result = await this.processQuery(
      db()
        .collection(this.collection)
        .insertOne(e.requestData({ destination: 'db-insert' })),
    );
    return e.resolveData({ _id: result.insertedId }, { source: 'db' });
  }

  async update(e: E): Promise<E> {
    const data = e.requestData<E>({ destination: 'db-update' });
    if (Object.keys(data).length === 0) {
      return e;
    }
    const result = await this.processQuery(
      db().collection<E>(this.collection).updateOne(
        this.buildDefaultFilter({}, '_id', e.identifier),
        {
          $set: data,
        },
        { upsert: true },
      ),
    );
    return e.resolveData(result, { source: 'db' });
  }

  async delete(e: E): Promise<void> {
    await this.processQuery(
      db()
        .collection<E>(this.collection)
        .deleteOne(this.buildDefaultFilter({}, '_id', e.identifier)),
    );
  }

  abstract collection: string;

  abstract buildFilter(
    filter: MongoFilter<E>,
    key: string,
    value: any,
  ): MongoFilter<E>;
}
