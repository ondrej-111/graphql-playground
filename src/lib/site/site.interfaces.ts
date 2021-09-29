import { EntityInterface } from 'lib/entities/entity.interfaces';

export interface SiteInterface extends EntityInterface {
  site_id: string;
  name: string;
}

export interface TankInterface extends EntityInterface {
  tank_id: string;
  name: string;
}

export enum SiteDbFilter {
  SITE_ID = 'site_id',
}

export enum TankDbFilter {
  TANK_ID = 'tank_id',
}
