import test from 'ava'
import {isEqual} from 'lodash'
import getAllPaths from '.'

test('paths for an empty object returns an empty array', t => {
  const input = {}
  const result = getAllPaths(input)
  t.true(result.length === 0)
})

test('returns an empty array for non-plain object', t => {
  const input = 'foo'
  const result = getAllPaths(input)
  t.true(result.length === 0)
})

test.skip('paths for an object with only primative properties returns a simple array', t => {
  const input = {
    a: 'hi',
    b: true,
    c: 23,
    d: null,
  }
  const result = getAllPaths(input)
  t.true(isEqual(result, [
    'a', 'b', 'c', 'd',
  ]))
})

test.skip('paths for an object with deep properties returns an array of the deepest of all properties', t => {
  const input = {
    level1: {
      level2: {
        level3: {
          leaf: true,
        },
        level32: {
          level4: {
            leaf: 'hi',
          },
        },
      },
    },
  }
  const result = getAllPaths(input)
  t.true(isEqual(result, [
    'level1.level2.level3.leaf',
    'level1.level2.level32.level4.leaf',
  ]))
})

test.skip('stops at arrays', t => {
  const input = {
    level1: {
      level2: {
        leaf: [
          {
            foo: {
              bar: 'baz',
            },
          },
        ],
      },
      level22: {
        level3: {
          leaf: [
            {
              foobar: {
                spam: 'eggs',
              },
            },
          ],
        },
      },
    },
  }
  const result = getAllPaths(input)
  t.true(isEqual(result, [
    'level1.level2.leaf',
    'level1.level22.level3.leaf',
  ]))
})

test.skip('handles recursive structures without blowing up', t => {
  const input1 = {}
  const input2 = {input1}
  input1.input2 = input2
  const result = getAllPaths(input1)
  t.true(isEqual(result, ['input2']))
})

