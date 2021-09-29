import { EntityInterface } from 'lib/entities/entity.interfaces';
import { MongoDbDriverAbstract } from './mongodb-driver.abstract';

export abstract class ServiceAbstract<E extends EntityInterface> {
  protected driver: MongoDbDriverAbstract<E>;

  protected constructor(driver: MongoDbDriverAbstract<E>) {
    this.driver = driver;
  }

  async getMany(filters?: Map<string, any>): Promise<E[]> {
    return this.resolveEntities(await this.driver.load(filters)) as E[];
  }

  async getOne(filters?: Map<string, any>): Promise<E> {
    const entities: E[] = await this.getMany(filters);
    if (!entities || entities.length === 0) {
      return this.resolveEntity();
    } else if (entities.length === 1) {
      return entities[0];
    } else {
      throw new Error(
        'Incorrectly used ServiceAbstract.getOne because more than one is returned',
      );
    }
  }

  async saveOne(entity: E): Promise<E> {
    return await this.driver.save(entity);
  }

  async saveMany(entities: E[]): Promise<E[]> {
    throw Error('Not implemented yet');
  }

  deleteOne(entity: E): Promise<void> {
    return this.driver.delete(entity);
  }

  async deleteMany(entities: E[]): Promise<void> {
    throw Error('Not implemented yet');
  }

  protected resolveEntities(entities: EntityInterface[]): E[] {
    const result: E[] = [];
    for (const e of entities) {
      if (e) {
        result.push(this.resolveEntity(e));
      }
    }
    return result;
  }

  protected abstract resolveEntity(entity?: EntityInterface): E;
}
