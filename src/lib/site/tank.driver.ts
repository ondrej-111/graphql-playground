import { Service } from 'typedi';
import { TankDbFilter, TankInterface } from 'lib/site/site.interfaces';
import { MongoDbDriverAbstract } from 'lib/mongodb-driver.abstract';
import { Filter } from 'mongodb';
import { toArray } from 'lib/utils/array';

@Service()
export class TankDriver<
  E extends TankInterface = TankInterface,
> extends MongoDbDriverAbstract<E> {
  get collection(): string {
    return 'tanks';
  }

  buildFilter(filter: Filter<E>, key: string, value: string): Filter<E> {
    switch (key) {
      case TankDbFilter.TANK_ID:
        filter = this.buildDefaultFilter(filter, '_id', value);
        break;
      case TankDbFilter.SITE_ID:
        filter = {
          ...filter,
          site_id: { $in: toArray(value) },
        };
        break;
    }
    return filter;
  }
}
