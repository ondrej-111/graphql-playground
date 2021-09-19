import { EntityAbstract } from 'lib/core/entities/entity.abstract';

export function requestMissingKeys(
  entity: EntityAbstract,
  requestBody: Partial<object>,
): string[] {
  const requiredKeys = entity.requiredKeys ? entity.requiredKeys() : [];
  if (!requiredKeys.length) return [];
  const providedKeys = Object.keys(requestBody);
  return requiredKeys.filter((rk) => !providedKeys.includes(rk));
}
