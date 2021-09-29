export function toArray<E>(arg: any | any[], force: boolean = true): E[] {
  return Array.isArray(arg) ? arg : !arg && force ? [] : arg;
}
