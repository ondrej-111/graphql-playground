import { TankInterface } from 'lib/site/site.interfaces';
import { EntityAbstract } from 'lib/entities/entity.abstract';
import { EntityResolveOptionsInterface } from 'lib/entities/entity.interfaces';
import { entity, id } from 'lib/entities/entity.decorators';

@entity
export class TankEntity extends EntityAbstract implements TankInterface {
  @id()
  tank_id = '';

  name: string = '';

  constructor(
    data?: Partial<TankInterface>,
    options?: EntityResolveOptionsInterface,
  ) {
    super();
    this.resolveData(data, options);
  }

  get identifier(): string {
    return this.tank_id;
  }
}
