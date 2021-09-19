import { Moment } from 'moment';

export interface EntityInterface {
  asUpdate: boolean;

  created_datetime: Moment;

  inner_entities?: InnerEntityInterfaces[];

  updated_fields?: string[];

  requiredKeys?(): string[];

  forbiddenUpdatedFields(): string[];

  requestIgnoreFields?(): string[];

  insertIgnoreFields?(): string[];

  updateIgnoreFields?(): string[];

  momentDateTimeExchangeFields?(): string[];

  momentDateExchangeFields?(): string[];

  readonly identifier: string | number;

  setData(data: object, options?: EntityOptions): this;

  afterSetData?(data?: any): void;

  setDataIgnoreFields?: () => string[];

  request(options?: RequestOptions): object;

  insert(): object;

  update(): object;
}

export interface InstantiableInterface {
  new (...args: any[]): any;
}

export interface InnerEntityInterfaces {
  identifier: string;
  propName: string;
  instantiable: InstantiableInterface;
}

export interface DeletableInterface {
  deleted: boolean;
  deleted_user_id: boolean;
  deleted_datetime: Moment;
}

export interface EntityOptions {
  asUpdate?: boolean;
}

export interface RequestOptions {
  removeEmpty: boolean;
  ignoreFields?: string[];
  thisKeys?: string[];
  replaceWIthIdentifier?: boolean;
  stringifyObject?: boolean;
}
