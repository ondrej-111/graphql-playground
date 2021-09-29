export type DataSourceType = 'db' | 'fe';

export type DataDestinationType = 'db-insert' | 'db-update' | 'fe';

export interface EntityInterface {
  /**
   * entity name
   */
  entityName: string;

  /**
   * entity identifier
   */
  readonly identifier: string | number;

  /**
   * instantiable nested entities
   */
  nestedEntities?: NestedEntityInterface[];

  sourceAliases: Map<DataSourceType, FieldsAliasInterface>;
  destinationAliases: Map<DataDestinationType, FieldsAliasInterface>;

  ignoreKeys: IgnoreKeysInterface;

  resolveData(data: object, options?: EntityResolveOptionsInterface): this;

  requestData<E extends object = object>(
    options?: EntityRequestOptionsInterface,
  ): E;
}

export interface InstantiableInterface {
  new (...args: any[]): EntityInterface;
}

export interface NestedEntityInterface {
  identifier: string;
  propName: string;
  instantiable: InstantiableInterface;
}

export interface EntityResolveOptionsInterface {
  source: DataSourceType;
  patch?: boolean;
}

export interface EntityRequestOptionsInterface {
  destination: DataDestinationType;
  removeEmpty?: boolean;
}

export interface FieldsAliasInterface {
  [source_key: string]: string;
}

export interface IgnoreKeysInterface {
  source: Map<DataSourceType, string[]>;
  destination: Map<DataDestinationType, string[]>;
}

export interface DistinctFieldInterface {
  fieldNames: [string, string];
  defaultValue: any;
}
