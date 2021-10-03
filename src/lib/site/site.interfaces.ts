import { EntityInterface } from 'lib/entities/entity.interfaces';

export interface SiteInterface extends EntityInterface {
  site_id: string;
  name: string;
}

export interface SegmentInterface {
  up_to_cm: number;
  liters_per_cm: number;
}

export interface TankInterface extends EntityInterface {
  tank_id: string;
  site_id: string;
  name: string;
  readonly total_height_cm: number;
  readonly total_volume_l: number;
  segments: SegmentInterface[] | string;
}

export enum SiteDbFilter {
  SITE_ID = 'site_id',
}

export enum TankDbFilter {
  SITE_ID = 'site_id',
  TANK_ID = 'tank_id',
}
