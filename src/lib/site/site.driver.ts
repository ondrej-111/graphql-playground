import { Service } from 'typedi';
import { SiteDbFilter, SiteInterface } from 'lib/site/site.interfaces';
import { MongoDbDriverAbstract } from 'lib/mongodb-driver.abstract';
import { Filter } from 'mongodb';

@Service()
export class SiteDriver<
  E extends SiteInterface = SiteInterface,
> extends MongoDbDriverAbstract<E> {
  get collection(): string {
    return 'sites';
  }

  buildFilter(filter: Filter<E>, key: string, value: any): Filter<E> {
    switch (key) {
      case SiteDbFilter.SITE_ID:
        filter = this.buildDefaultFilter(filter, '_id', value);
        break;
    }
    return filter;
  }
}
