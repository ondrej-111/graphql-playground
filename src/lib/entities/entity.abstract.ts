import {
  DataDestinationType,
  DataSourceType,
  EntityInterface,
  EntityRequestOptionsInterface,
  EntityResolveOptionsInterface,
  FieldsAliasInterface,
  IgnoreKeysInterface,
  NestedEntityInterface,
} from './entity.interfaces';

export abstract class EntityAbstract implements EntityInterface {
  entityName: string = 'test';
  nestedEntities?: NestedEntityInterface[];
  sourceAliases: Map<DataSourceType, FieldsAliasInterface>;
  destinationAliases: Map<DataDestinationType, FieldsAliasInterface>;
  ignoreKeys: IgnoreKeysInterface;

  defaultIgnoreKeys = [
    'defaultIgnoreKeys',
    'entityName',
    'nestedEntities',
    'sourceAliases',
    'destinationAliases',
    'ignoreKeys',
  ];

  abstract identifier: string | number;

  // private setterKeys: string[];

  // private nestedEntitiesPropNames(): string[] {
  //   return this.nested_entities
  //     ? this.nested_entities.map((ie) => ie.propName)
  //     : [];
  // }

  // private nestedEntityIndex(innE: Partial<NestedEntityInterface>): number {
  //   if (!this.nested_entities) return -1;
  //   if (innE.identifier) {
  //     return this.nested_entities.findIndex(
  //       (ie) => ie.identifier === innE.identifier,
  //     );
  //   }
  //   if (innE.propName) {
  //     return this.nested_entities.findIndex(
  //       (ie) => ie.propName === innE.propName,
  //     );
  //   }
  // }

  // private exposeGetterProps(replaceWIthIdentifier?: boolean) {
  //   const returnKeys = [];
  //   for (const k of Object.keys(this)) {
  //     if (['_updated_fields', '_setters_keys'].includes(k)) {
  //       continue;
  //     }
  //     let returnK = k;
  //     if (k.startsWith('_')) {
  //       const getter: string = k.substring(2);
  //       // getter exists
  //       if (Object.prototype.hasOwnProperty.call(this, getter) !== undefined) {
  //         returnK = getter;
  //       }
  //     }
  //     if (replaceWIthIdentifier) {
  //       const innIdx = this.nestedEntityIndex({ propName: returnK });
  //       if (innIdx !== -1) {
  //         returnK = this.nestedEntities()[innIdx].identifier;
  //       }
  //     }
  //     returnKeys.push(returnK);
  //   }
  //   return returnKeys;
  // }
  //
  // private exposeUpdatedProps(data: object) {
  //   const updatedFields = Object.keys(data) || [];
  //   if (this.nestedEntities) {
  //     for (const innerEntity of this.nestedEntities()) {
  //       if (Object.prototype.hasOwnProperty.call(data, innerEntity.propName)) {
  //         updatedFields.push(innerEntity.identifier);
  //       }
  //     }
  //   }
  //   this.updated_fields = this.updated_fields
  //     ? this.updated_fields.concat(updatedFields)
  //     : updatedFields;
  // }

  resolveData(data: object, options?: EntityResolveOptionsInterface): this {
    // this.asUpdate = options?.asUpdate;
    // if (this.asUpdate) this.exposeUpdatedProps(data);
    // this.exposeSetterProps();

    // const keys = this.setDataIgnoreFields
    //   ? Object.keys(data).filter((k) => !this.setDataIgnoreFields().includes(k))
    //   : Object.keys(data);
    let ignoreKeys = this.defaultIgnoreKeys;
    if (this.ignoreKeys?.source?.has(options.source)) {
      ignoreKeys = [
        ...ignoreKeys,
        ...this.ignoreKeys.source.get(options.source),
      ];
    }

    for (let prop of Object.keys(data || {}) || []) {
      if (ignoreKeys.includes(prop)) continue;

      if (options.source && this.sourceAliases.has(options.source)) {
        const remapKey = this.sourceAliases.get(options.source)[prop];
        if (remapKey) {
          data[remapKey] =
            options.source === 'db' && prop === '_id'
              ? data[prop].toString('hex')
              : data[prop];
          prop = remapKey;
        }
      }
      // prop must be initialized in entity
      if (!this.hasOwnProperty(prop)) continue;
      // const innerEntityI = this.nestedEntities
      //   ? this.nestedEntities().findIndex(
      //       (e: NestedEntityInterface) => e.propName === prop,
      //     )
      //   : -1;
      // if (innerEntityI !== -1) {
      //   this[prop] = new (
      //     this.nestedEntities()[innerEntityI] as NestedEntityInterface
      //   ).instantiable(data[prop], options);
      // } else {
      // if (
      //   this.momentDateExchangeFields &&
      //   this.momentDateExchangeFields().includes(prop)
      // ) {
      //   this[prop] = data[prop] ? moment.utc(data[prop]) : data[prop];
      // } else if (
      //   this.momentDateTimeExchangeFields &&
      //   this.momentDateTimeExchangeFields().includes(prop)
      // ) {
      //   this[prop] = data[prop] ? moment.utc(data[prop]) : data[prop];
      // } else {
      this[prop] = data[prop];
      // }
      // }
    }
    return this;
  }

  requestData<E extends object = object>(
    options: EntityRequestOptionsInterface,
  ): E {
    const removeEmpty = options?.removeEmpty || true;

    // const ignoreProps = ignoreFields
    //   ? ignoreFields
    //   : this.requestIgnoreFields
    //   ? this.requestIgnoreFields()
    //   : [];
    // const thisKeys =
    //   options?.thisKeys ||
    //   this.exposeGetterProps(options?.replaceWIthIdentifier);

    let ignoreKeys = this.defaultIgnoreKeys;
    if (this.ignoreKeys?.destination?.has(options.destination)) {
      ignoreKeys = [
        ...ignoreKeys,
        ...this.ignoreKeys.destination.get(options.destination),
      ];
    }

    const data = {};
    for (const prop of Object.keys(this)) {
      if (
        removeEmpty &&
        (!this[prop] ||
          (typeof this[prop] === 'object' &&
            Object.keys(this[prop]).length === 0))
      )
        continue;
      if (ignoreKeys.includes(prop)) continue;
      // let objectProp = undefined;
      // if (!ignoreProps.includes(prop)) continue;
      // if (this.nestedEntitiesPropNames().includes(prop)) {
      //   const entity = this[prop].requestData({
      //     removeEmpty,
      //     ignoreFields,
      //   });
      //   if (typeof entity === 'object' && Object.keys(entity).length === 0)
      //     continue;
      //   objectProp = entity;
      // } else if (typeof this[prop] === 'object') {
      //   if (Object.keys(this[prop]).length === 0) continue;
      //   objectProp = this[prop];
      // } else {
      data[prop] = this[prop];
      // }
    }

    return data as E;
  }
}
