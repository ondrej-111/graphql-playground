import {
  EntityInterface,
  EntityOptions,
  InnerEntityInterfaces,
  RequestOptions,
} from './entity.interfaces';
import moment, { Moment } from 'moment';

export abstract class EntityAbstract implements EntityInterface {
  asUpdate = false;
  created_datetime: Moment = null;

  _updated_fields: string[];

  private _setters_keys: string[];

  private innerEntitiesPropNames(): string[] {
    return this.innerEntities
      ? this.innerEntities().map((ie) => ie.propName)
      : [];
  }

  private innerEntitiyIndex(innE: Partial<InnerEntityInterfaces>): number {
    if (!this.innerEntities) return -1;
    if (innE.identifier) {
      return this.innerEntities().findIndex(
        (ie) => ie.identifier === innE.identifier,
      );
    }
    if (innE.propName) {
      return this.innerEntities().findIndex(
        (ie) => ie.propName === innE.propName,
      );
    }
  }

  innerEntities?(): InnerEntityInterfaces[];

  set updated_fields(fs: string[]) {
    this._updated_fields = fs;
  }

  get updated_fields(): string[] {
    return this._updated_fields || [];
  }

  forbiddenUpdatedFields(): string[] {
    const entitiesKeys = this.innerEntitiesPropNames();
    return this.updated_fields && this.updateIgnoreFields
      ? this.updated_fields.filter((uf) =>
          this.updateIgnoreFields()
            .filter((uif) => !entitiesKeys.includes(uif))
            .includes(uf),
        )
      : [];
  }

  requiredKeys?(): string[];

  requestIgnoreFields?(): string[];

  insertIgnoreFields?(): string[];

  updateIgnoreFields?(): string[];

  momentDateTimeExchangeFields?(): string[];

  momentDateExchangeFields?(): string[];

  abstract identifier: string | number;

  private exposeSetterProps() {
    this._setters_keys = [];
    for (const k of Object.keys(this)) {
      if (k.indexOf('__') === 0) {
        const getter: string = k.substring(2);
        // getter exists
        if (Object.prototype.hasOwnProperty.call(this, getter) !== undefined) {
          this._setters_keys.push(getter);
        }
      }
    }
  }

  private exposeGetterProps(replaceWIthIdentifier?: boolean) {
    const returnKeys = [];
    for (const k of Object.keys(this)) {
      if (['_updated_fields', '_setters_keys'].includes(k)) {
        continue;
      }
      let returnK = k;
      if (k.startsWith('__')) {
        const getter: string = k.substring(2);
        // getter exists
        if (Object.prototype.hasOwnProperty.call(this, getter) !== undefined) {
          returnK = getter;
        }
      }
      if (replaceWIthIdentifier) {
        const innIdx = this.innerEntitiyIndex({ propName: returnK });
        if (innIdx !== -1) {
          returnK = this.innerEntities()[innIdx].identifier;
        }
      }
      returnKeys.push(returnK);
    }
    return returnKeys;
  }

  private exposeUpdatedProps(data: object) {
    const updatedFields = Object.keys(data) || [];
    if (this.innerEntities) {
      for (const innerEntity of this.innerEntities()) {
        if (Object.prototype.hasOwnProperty.call(data, innerEntity.propName)) {
          updatedFields.push(innerEntity.identifier);
        }
      }
    }
    this.updated_fields = this.updated_fields
      ? this.updated_fields.concat(updatedFields)
      : updatedFields;
  }

  afterSetData?(data?: any): void;

  setDataIgnoreFields?(): string[];

  setData(data: object, options?: EntityOptions): this {
    this.asUpdate = options?.asUpdate;
    if (this.asUpdate) this.exposeUpdatedProps(data);
    this.exposeSetterProps();

    const keys = this.setDataIgnoreFields
      ? Object.keys(data).filter((k) => !this.setDataIgnoreFields().includes(k))
      : Object.keys(data);
    for (const prop of keys || []) {
      // prop must be initialized in entity
      if (this.hasOwnProperty(prop) || this._setters_keys.includes(prop)) {
        const innerEntityI = this.innerEntities
          ? this.innerEntities().findIndex(
              (e: InnerEntityInterfaces) => e.propName === prop,
            )
          : -1;
        if (innerEntityI !== -1) {
          this[prop] = new (
            this.innerEntities()[innerEntityI] as InnerEntityInterfaces
          ).instantiable(data[prop], options);
        } else {
          if (
            this.momentDateExchangeFields &&
            this.momentDateExchangeFields().includes(prop)
          ) {
            this[prop] = data[prop] ? moment.utc(data[prop]) : data[prop];
          } else if (
            this.momentDateTimeExchangeFields &&
            this.momentDateTimeExchangeFields().includes(prop)
          ) {
            this[prop] = data[prop] ? moment.utc(data[prop]) : data[prop];
          } else {
            this[prop] = data[prop];
          }
        }
      }
    }
    if (this?.afterSetData) {
      this.afterSetData(data);
    }
    this.asUpdate = false;
    return this;
  }

  request(options?: RequestOptions): object {
    const removeEmpty = options?.removeEmpty || true;
    const ignoreFields = options?.ignoreFields;

    const ignoreProps = ignoreFields
      ? ignoreFields
      : this.requestIgnoreFields
      ? this.requestIgnoreFields()
      : [];
    const thisKeys =
      options?.thisKeys ||
      this.exposeGetterProps(options?.replaceWIthIdentifier);

    const data = {};
    for (const prop of thisKeys) {
      if (
        removeEmpty &&
        (!this[prop] ||
          (typeof this[prop] === 'object' &&
            Object.keys(this[prop]).length === 0))
      )
        continue;

      let objectProp = undefined;
      if (!ignoreProps.includes(prop)) {
        if (this.innerEntitiesPropNames().includes(prop)) {
          const entity = (this[prop] as EntityInterface).request({
            removeEmpty,
            ignoreFields,
          });
          if (typeof entity === 'object' && Object.keys(entity).length === 0)
            continue;
          objectProp = entity;
        } else if (
          this.momentDateExchangeFields &&
          this.momentDateExchangeFields().includes(prop)
        ) {
          data[prop] = this[prop]
            ? (this[prop] as Moment).format('YYYY-MM-DD')
            : this[prop];
        } else if (
          this.momentDateTimeExchangeFields &&
          this.momentDateTimeExchangeFields().includes(prop)
        ) {
          data[prop] = this[prop]
            ? (this[prop] as Moment).format('YYYY-MM-DDTHH:mm:ss[Z]')
            : this[prop];
        } else if (typeof this[prop] === 'object') {
          if (Object.keys(this[prop]).length === 0) continue;
          objectProp = this[prop];
        } else {
          data[prop] = this[prop];
        }
        if (objectProp) {
          data[prop] = options?.stringifyObject
            ? JSON.stringify(this[prop])
            : this[prop];
        }
      }
    }

    return data;
  }

  insert(options?: RequestOptions): object {
    return this.request({
      removeEmpty: options?.removeEmpty ?? true,
      ignoreFields:
        options?.ignoreFields ?? this.insertIgnoreFields
          ? this.insertIgnoreFields()
          : [],
      replaceWIthIdentifier: options?.replaceWIthIdentifier ?? true,
      stringifyObject: options?.stringifyObject ?? true,
    });
  }

  update(options?: RequestOptions): object {
    const updateIgnoreFields = this.updateIgnoreFields
      ? this.updateIgnoreFields().concat(['_update_fields'])
      : ['_update_fields'];
    return this.request({
      removeEmpty: options?.removeEmpty ?? false,
      ignoreFields:
        options?.ignoreFields ?? this.updateIgnoreFields
          ? this.updateIgnoreFields().concat(updateIgnoreFields)
          : updateIgnoreFields,
      thisKeys: this.updated_fields,
      replaceWIthIdentifier: options?.replaceWIthIdentifier ?? true,
      stringifyObject: options?.stringifyObject ?? true,
    });
  }
}
