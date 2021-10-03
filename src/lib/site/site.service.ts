import { ServiceAbstract } from 'lib/service.abstract';
import { SiteDriver } from 'lib/site/site.driver';
import { SiteEntity } from 'lib/site/site.entity';
import { SiteInterface } from 'lib/site/site.interfaces';
import { Service } from 'typedi';

@Service()
export class SiteService<
  E extends SiteEntity = SiteEntity,
> extends ServiceAbstract<E> {
  constructor(protected driver: SiteDriver<E>) {
    super(driver);
  }

  resolveEntity(data: SiteInterface): E {
    return new SiteEntity(data, { source: 'db' }) as E;
  }
}
