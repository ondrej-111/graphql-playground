import { Service } from 'typedi';
import { TankDbFilter, TankInterface } from 'lib/site/site.interfaces';
import { MongoDbDriverAbstract } from 'lib/mongodb-driver.abstract';
import { MongoFilter } from 'lib/utils/mongo/mongo.interfaces';

@Service()
export class TankDriver<
  E extends TankInterface = TankInterface,
> extends MongoDbDriverAbstract<E> {
  get collection(): string {
    return 'tanks';
  }

  buildFilter(filter: MongoFilter<E>, key: string, value: any): MongoFilter<E> {
    switch (key) {
      case TankDbFilter.TANK_ID:
        this.buildDefaultFilter(filter, '_id', value);
        break;
    }
    return filter;
  }
}
