import { SiteInterface } from 'lib/site/site.interfaces';
import { EntityAbstract } from 'lib/core/entities/entity.abstract';
import { EntityOptions } from 'lib/core/entities/entity.interfaces';

export class SiteEntity extends EntityAbstract implements SiteInterface {
  name: string = '';
  site_id: number = null;

  constructor(data: Partial<SiteInterface>, options?: EntityOptions) {
    super();
    this.setData(data, options);
  }

  get identifier(): number {
    return this.site_id;
  }
}
