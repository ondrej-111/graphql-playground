import { TankInterface } from 'lib/site/site.interfaces';
import { Service } from 'typedi';
import { TankDriver } from './tank.driver';
import { TankEntity } from './tank.entity';
import { ServiceAbstract } from 'lib/service.abstract';

@Service()
export class TankService<
  E extends TankEntity = TankEntity,
> extends ServiceAbstract<E> {
  constructor(protected driver: TankDriver<E>) {
    super(driver);
  }

  resolveEntity(data: TankInterface): E {
    return new TankEntity(data, { source: 'db' }) as E;
  }
}
