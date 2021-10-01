import { ObjectId } from 'bson';
import { toArray } from '../array';

export function toObjectIds(val: string | string[]): ObjectId[] {
  val = toArray(val);
  return val.map((v) => new ObjectId(v));
}
