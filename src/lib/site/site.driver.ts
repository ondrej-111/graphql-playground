import { Service } from 'typedi';
import { SiteDbFilter, SiteInterface } from 'lib/site/site.interfaces';
import { MongoDbDriverAbstract } from 'lib/mongodb-driver.abstract';
import { MongoFilter } from 'lib/utils/mongo/mongo.interfaces';

@Service()
export class SiteDriver<
  E extends SiteInterface = SiteInterface,
> extends MongoDbDriverAbstract<E> {
  get collection(): string {
    return 'sites';
  }

  buildFilter(filter: MongoFilter<E>, key: string, value: any): MongoFilter<E> {
    switch (key) {
      case SiteDbFilter.SITE_ID:
        this.buildDefaultFilter(filter, '_id', value);
        break;
    }
    return filter;
  }
}
