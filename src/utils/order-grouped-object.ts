import { isNullOrUndefined, ObjectKeys } from '@raicamposs/toolkit'

export const orderGroupedObject = <T extends Object>(
  groupedObject: T,
  compareFn?: (a: keyof T, b: keyof T) => number,
) => {
  if (
    isNullOrUndefined(groupedObject) ||
    typeof groupedObject !== 'object' ||
    Array.isArray(groupedObject)
  ) {
    return groupedObject
  }

  const keys = ObjectKeys(groupedObject)

  if (keys.length === 0) return groupedObject

  keys.sort(compareFn)

  const orderedGroups: Partial<T> = {}
  for (const key of keys) {
    orderedGroups[key] = groupedObject[key]
  }

  return orderedGroups
}

export const groupByAndOrder = <K extends PropertyKey, T>(
  items: Iterable<T>,
  keySelector: (item: T, index: number) => K,
): Partial<Record<K, T[]>> => {
  const group = Object.groupBy(items, keySelector)
  return orderGroupedObject(group)
}


export const groupBy = <T, K extends PropertyKey>(
  items: T[],
  keySelector: (item: T, index: number) => K
): Partial<Record<K, T[]>> => {
  const result: Partial<Record<K, T[]>> = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = keySelector(item, i);
    if (!result[key]) {
      result[key] = [];
    }
    result[key]?.push(item);
  }
  return result;
}
