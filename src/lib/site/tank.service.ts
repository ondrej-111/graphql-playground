import { TankDbFilter, TankInterface } from 'lib/site/site.interfaces';
import { Service } from 'typedi';
import { TankDriver } from './tank.driver';
import { TankEntity } from './tank.entity';
import { ServiceAbstract } from 'lib/service.abstract';
import Dataloader from 'dataloader';

@Service()
export class TankService<
  E extends TankEntity = TankEntity,
> extends ServiceAbstract<E> {
  private dl: any;

  constructor(protected driver: TankDriver<E>) {
    super(driver);
    this.dl = new Dataloader<string, E[]>(async (ids: readonly string[]) => {
      console.log(`Load tanks by site_id.: ${ids}`);
      const tanks = await this.getMany(
        new Map<TankDbFilter, any>([[TankDbFilter.SITE_ID, ids]]),
      );
      const returnTanks: E[][] = [];
      for (const id of ids) {
        returnTanks.push(tanks.filter((v) => v.site_id === id) || []);
      }
      return returnTanks;
    });
  }

  resolveEntity(data: TankInterface): E {
    return new TankEntity(data, { source: 'db' }) as E;
  }

  getBySiteId(site_id: string): E[] {
    return this.dl.load(site_id);
  }
}
