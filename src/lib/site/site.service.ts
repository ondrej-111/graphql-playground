import { SiteDriver } from 'lib/site/site.driver';
import { EntityAbstract } from 'lib/core/entities/entity.abstract';
import { SiteEntity } from 'lib/site/site.entity';
import { SiteInterface } from 'lib/site/site.interfaces';
import { Service } from 'typedi';

@Service()
export class SiteService<E extends EntityAbstract = SiteEntity> {
  static counter = 0;
  static getManyCounter = 0;

  constructor(protected driver: SiteDriver) {
    SiteService.counter++;
    console.log(`SiteService instancies: ${SiteService.counter}`);
  }

  async getMany(): Promise<E[]> {
    console.log(
      `GET_MANY - COUNTER - ${SiteService.getManyCounter} - instance = ${SiteService.counter}`,
    );
    const es = await this.driver.load().toArray();
    return this.resolveEntities(es as SiteInterface[]) as unknown as E[];
  }

  protected resolveEntities(entities: SiteInterface[]): SiteEntity[] {
    const result: SiteEntity[] = [];
    for (const e of entities) {
      if (e) {
        result.push(this.resolveEntity(e));
      }
    }
    return result;
  }

  resolveEntity(entity: SiteInterface): SiteEntity {
    return new SiteEntity(entity);
  }
}
