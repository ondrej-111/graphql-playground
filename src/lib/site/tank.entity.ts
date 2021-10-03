import { SegmentInterface, TankInterface } from 'lib/site/site.interfaces';
import { EntityAbstract } from 'lib/entities/entity.abstract';
import { EntityResolveOptionsInterface } from 'lib/entities/entity.interfaces';
import { entity, id } from 'lib/entities/entity.decorators';

@entity
export class TankEntity extends EntityAbstract implements TankInterface {
  @id()
  tank_id = '';
  site_id = '';
  segments: SegmentInterface[] = [];

  name: string = '';
  total_height_cm: number = null;
  total_volume_l: number = null;

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

  sortedSegments(asc: boolean): SegmentInterface[] {
    return asc
      ? this.segments.sort((a, b) => a.up_to_cm - b.up_to_cm)
      : this.segments.sort((a, b) => b.up_to_cm - a.up_to_cm);
  }
}
