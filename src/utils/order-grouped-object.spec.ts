import { describe, expect, it } from 'vitest'
import { groupByAndOrder, orderGroupedObject } from './order-grouped-object'

describe('orderGroupedObject', () => {
  it('should return the same value if input is null', () => {
    expect(orderGroupedObject(null as any)).toBeNull()
  })

  it('should return the same value if input is undefined', () => {
    expect(orderGroupedObject(undefined as any)).toBeUndefined()
  })

  it('should return the same value if input is not an object', () => {
    expect(orderGroupedObject(42 as any)).toBe(42)
    expect(orderGroupedObject('test' as any)).toBe('test')
    expect(orderGroupedObject(true as any)).toBe(true)
  })

  it('should return the same value if input is an array', () => {
    const arr = [1, 2, 3]
    expect(orderGroupedObject(arr as any)).toBe(arr)
  })

  it('should return the same object if it has no keys', () => {
    const obj = {}
    expect(orderGroupedObject(obj)).toBe(obj)
  })

  it('should order object keys alphabetically by default', () => {
    const obj = { b: 2, a: 1, c: 3 }
    const result = orderGroupedObject(obj)
    expect(Object.keys(result)).toEqual(['a', 'b', 'c'])
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should order object keys using a custom compare function', () => {
    const obj = { b: 2, a: 1, c: 3 }
    const result = orderGroupedObject(obj, (a, b) => (a < b ? 1 : -1))
    expect(Object.keys(result)).toEqual(['c', 'b', 'a'])
    expect(result).toEqual({ c: 3, b: 2, a: 1 })
  })
})

describe('groupByAndOrder', () => {
  it('should group items by key and order the groups alphabetically', () => {
    const items = [
      { type: 'fruit', name: 'apple' },
      { type: 'vegetable', name: 'carrot' },
      { type: 'fruit', name: 'banana' },
    ]
    const result = groupByAndOrder(items, item => item.type)
    expect(Object.keys(result)).toEqual(['fruit', 'vegetable'])
    expect(result).toEqual({
      fruit: [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' },
      ],
      vegetable: [
        { type: 'vegetable', name: 'carrot' },
      ],
    })
  })

  it('should return an empty object if items is empty', () => {
    const result = groupByAndOrder([], item => (item as any).type)
    expect(result).toEqual({})
  })

  it('should group by numeric keys and order them', () => {
    const items = [
      { id: 2, value: 'b' },
      { id: 1, value: 'a' },
      { id: 2, value: 'c' },
    ]
    const result = groupByAndOrder(items, item => item.id)
    expect(Object.keys(result)).toEqual(['1', '2'])
    expect(result).toEqual({
      1: [{ id: 1, value: 'a' }],
      2: [
        { id: 2, value: 'b' },
        { id: 2, value: 'c' },
      ],
    })
  })
})