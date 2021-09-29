// import { EntityAbstract } from 'lib/entities/entity.abstract';
// import { EntityInterface } from 'lib/entities/entity.interfaces';

export type ResolveDataType = 'db' | 'fe';

// function _resolveData<E extends EntityAbstract>(
//   data: EntityInterface,
//   entity: E,
//   settings?: ResolveDataSettingInterface,
// ): E {
//   for (const prop of data ? Object.keys(data) : []) {
//     // prop must be initialized in entity
//     if (settings?.asDbId === prop) {
//       entity[settings.asDbIdInEntity] = (data[prop] as Buffer).toString('hex');
//     } else if (entity.hasOwnProperty(prop)) {
//       entity[prop] = data[prop];
//     }
//   }
//   return entity;
// }
//
// function resolveDbData<E extends EntityAbstract>(
//   data: EntityInterface,
//   entity: new (...args: any[]) => EntityAbstract,
// ): E {
//   const settings: ResolveDataSettingInterface = Object.getPrototypeOf(entity);
//   return _resolveData<E>(data, entity, settings);
// }
//
// function resolveFeData<E extends EntityAbstract>(
//   data: EntityInterface,
//   entity: E,
// ): E {
//   const settings: ResolveDataSettingInterface = Object.getPrototypeOf(entity);
//   return _resolveData<E>(data, entity, settings);
// }
//
// export function resolveEntityData<E extends EntityAbstract>(
//   type: ResolveDataType,
//   data: EntityInterface,
//   entity: new (...args: any[]) => EntityAbstract,
// ): E {
//   switch (type) {
//     case 'db':
//       return resolveDbData(data, entity);
//     case 'fe':
//       return resolveFeData(data, entity);
//   }
// }
