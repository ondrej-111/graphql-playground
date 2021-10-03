import { SiteInterface } from 'lib/site/site.interfaces';
import { EntityAbstract } from 'lib/entities/entity.abstract';
import { EntityResolveOptionsInterface } from 'lib/entities/entity.interfaces';
import { entity, id } from 'lib/entities/entity.decorators';

@entity
export class SiteEntity extends EntityAbstract implements SiteInterface {
  @id()
  site_id: string = null;

  name: string = '';

  constructor(
    data?: Partial<SiteInterface>,
    options?: EntityResolveOptionsInterface,
  ) {
    super();
    this.resolveData(data, options);
  }

  get identifier(): string {
    return this.site_id;
  }
}
