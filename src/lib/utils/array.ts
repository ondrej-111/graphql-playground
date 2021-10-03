export function toArray<E>(arg: any | any[], force: boolean = true): E[] {
  if (force && (arg === null || arg === undefined)) return [];
  return Array.isArray(arg) ? arg : [arg];
}
