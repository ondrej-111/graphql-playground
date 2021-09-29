import {
  DataDestinationType,
  DataSourceType,
  FieldsAliasInterface,
} from 'lib/entities/entity.interfaces';
import { EntityAbstract } from 'lib/entities/entity.abstract';
import { toArray } from 'lib/utils/array';

export function entity(constructorFunction: any) {
  constructorFunction.entityName = constructorFunction.name;
}

/**
 * equal to:
 *    - @sourceAlias('_id', 'db')
 *    - @ignore({ destination: ['db-insert', 'db-update'] })
 */
export function id() {
  return (target: EntityAbstract, key: string) => {
    sourceAlias('_id', 'db')(target, key);
    ignore({ destinations: ['db-insert', 'db-update'] })(target, key);
  };
}

export function sourceAlias(
  alias: string,
  sourceTypes: DataSourceType | DataSourceType[] = 'db',
) {
  sourceTypes = Array.isArray(sourceTypes) ? sourceTypes : [sourceTypes];
  return (target: EntityAbstract, key: string) => {
    // const target: EntityInterface = target.constructor;
    if (!target.sourceAliases) {
      target.sourceAliases = new Map<DataSourceType, FieldsAliasInterface>();
    }
    if (!target.destinationAliases) {
      target.destinationAliases = new Map<
        DataDestinationType,
        FieldsAliasInterface
      >();
    }
    for (const st of sourceTypes as DataSourceType[]) {
      if (!target.sourceAliases.has(st)) {
        target.sourceAliases.set(st, {});
        if (st === 'db') {
          target.destinationAliases.set('db-insert', {});
          target.destinationAliases.set('db-update', {});
        } else {
          target.destinationAliases.set(st, {});
        }
      }
      target.sourceAliases.get(st)[alias] = key;
      if (st === 'db') {
        target.destinationAliases.get('db-insert')[key] = alias;
        target.destinationAliases.get('db-update')[key] = alias;
      } else {
        target.destinationAliases.get(st)[key] = alias;
      }
    }
  };
}

export function ignore({
  sources = null,
  destinations = null,
}: {
  sources?: DataSourceType | DataSourceType[];
  destinations?: DataDestinationType | DataDestinationType[];
} = {}) {
  sources = toArray(sources);
  destinations = toArray(destinations);
  return (target: EntityAbstract, key: string) => {
    if (!target.ignoreKeys) {
      target.ignoreKeys = {
        source: new Map<DataSourceType, string[]>(),
        destination: new Map<DataDestinationType, string[]>(),
      };
    }
    for (const s of sources as DataSourceType[]) {
      if (!target.ignoreKeys.source.has(s)) {
        target.ignoreKeys.source.set(s, []);
      }
      target.ignoreKeys.source.get(s).push(key);
    }
    for (const d of destinations as DataDestinationType[]) {
      if (!target.ignoreKeys.destination.has(d)) {
        target.ignoreKeys.destination.set(d, []);
      }
      target.ignoreKeys.destination.get(d).push(key);
    }
  };
}
