// import { EntityAbstract } from 'lib/entities/entity.abstract';
// import { EntityInterface } from 'lib/entities/entity.interfaces';

export type RequestDataType = 'insert' | 'update' | 'fe';

// function _requestDate<E extends EntityAbstract, D extends EntityInterface>(
//   entity: E,
//   settings: RequestDataSettingInterface,
// ): D {
//   const data = {};
//   for (const [k, v] of Object.entries(entity)) {
//     data[k] = v;
//   }
//   return data as D;
// }
//
// function requestEntityInsertData<
//   E extends EntityAbstract,
//   D extends EntityInterface,
// >(entity: E): D {
//   const settings: RequestDataSettingInterface = Object.getPrototypeOf(entity);
//   return _requestDate(entity, settings);
// }
//
// function requestEntityUpdateData<
//   E extends EntityAbstract,
//   D extends EntityInterface,
// >(entity: E): D {
//   const settings: RequestDataSettingInterface = Object.getPrototypeOf(entity);
//   return _requestDate(entity, settings);
// }
//
// function requestEntityFeData<
//   E extends EntityAbstract,
//   D extends EntityInterface,
// >(entity: E): D {
//   const settings: RequestDataSettingInterface = Object.getPrototypeOf(entity);
//   return _requestDate(entity, settings);
// }
//
// export function requestEntityData<
//   E extends EntityAbstract,
//   D extends EntityInterface,
// >(type: RequestDataType, entity: E): D {
//   switch (type) {
//     case 'insert':
//       return requestEntityInsertData(entity);
//     case 'update':
//       return requestEntityUpdateData(entity);
//     case 'fe':
//       return requestEntityFeData(entity);
//   }
// }
