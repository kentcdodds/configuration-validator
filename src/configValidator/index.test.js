/* eslint no-console:0 */
import test from 'ava'
import sinon from 'sinon'

import configValidator from './index'

const EMPTY_RESULT = {
  errors: [],
  warnings: [],
  warningMessage: undefined,
  errorMessage: undefined,
}

test('No errors or warnings result in an return object with sensible "empty" values', t => {
  const result = configValidator('Webpack Config', {}, [])
  t.same(result, EMPTY_RESULT)
})

test('Errors are returned in the `errors` property of the return object ' +
     'and as formatted string under `errorMessage`', t => {
  const config = {bar: 'baz'}
  const validators = [{key: 'bar', validate: () => 'error'}]
  const result = configValidator('Webpack Config', config, validators)
  t.same(result.errors, [
    {
      key: 'bar',
      message: 'error',
      value: 'baz',
      validator: validators[0],
      type: 'error',
    },
  ])
  t.ok(result.errorMessage) // Test implementation details of this in `formatMessagesAsString` tests
})

test('Warnings are returned in the `warnings` property of the return object ' +
     'and as formatted string under `warningMessage`', t => {
  const config = {bar: 'baz'}
  const validators = [{key: 'bar', validate: () => ({warning: 'warning'})}]
  const result = configValidator('Webpack Config', config, validators)
  t.same(result.warnings, [
    {
      key: 'bar',
      message: 'warning',
      value: 'baz',
      validator: validators[0],
      type: 'warning',
    },
  ])
  t.ok(result.warningMessage) // Test implementation details of this in `formatMessagesAsString` tests
})

test('Unknown fields result in a warning', t => {
  const config = {bar: 'baz', cat: 'bag'}
  const validators = [{key: 'bar', validate: () => 'error'}]
  const result = configValidator('Webpack Config', config, validators)

  t.ok(result.errors.length === validators.length)
  t.ok(result.errorMessage)

  t.ok(result.warnings.length === 1)
  t.same(result.warnings[0], {
    key: 'cat',
    message: 'Unknown key',
    type: 'warning',
  })
  t.ok(result.warningMessage)
})

test('Nested fields should not trigger warnings if they validate', t => {
  const config = {
    foo: {
      bar: true,
      baz: 23,
    },
  }
  const validators = [
    {key: 'foo.bar', validate() {}},
    {key: 'foo.baz', validate() {}},
  ]
  const result = configValidator('Webpack Config', config, validators)
  t.same(result, EMPTY_RESULT)
})

test('Null fields should not trigger warnings if they validate', t => {
  const config = {
    foo: null,
    help: 'me',
  }
  const validators = [
    {key: 'foo', validate() {}},
    {key: 'help', validate() {}},
  ]
  const result = configValidator('Webpack Config', config, validators)
  t.same(result, EMPTY_RESULT)
})

test('Array fields should not have nested checks', t => {
  const config = {
    foo: null,
    help: ['me', 'you', 'them'],
  }
  const validators = [
    {key: 'foo', validate() {}},
    {key: 'help', validate() {}},
  ]
  const result = configValidator('Webpack Config', config, validators)
  t.same(result, EMPTY_RESULT)
})

test('Nested fields trigger when not validated', t => {
  const config = {
    foo: {
      bar: true,
      baz: 23,
    },
  }
  const validators = [
    {key: 'foo.bar', validate() {}},
  ]
  const result = configValidator('Webpack Config', config, validators)

  t.ok(result.warnings.length === 1)
  t.same(result.warnings[0], {
    key: 'foo.baz',
    message: 'Unknown key',
    type: 'warning',
  })
})

test('Deeply nested fields trigger when not validated', t => {
  const config = {
    foo: {
      bar: {
        cat: 'sink',
      },
      baz: 23,
    },
  }
  const validators = [
    {key: 'foo.bar.cat', validate: () => 'error'},
  ]
  const result = configValidator('Webpack Config', config, validators)
  t.ok(result.errors.length === 1)
  t.same(result.errors[0], {
    key: 'foo.bar.cat',
    message: 'error',
    type: 'error',
    validator: validators[0],
    value: 'sink',
  })
})

test('Does not log anything, that\'s left to the API consumer', t => {
  const consoleLogSpy = sinon.spy(console, 'log')

  const config = {bar: 'baz'}
  const validators = [{key: 'bar', validate: () => ({warning: 'warning'})}]
  configValidator('Webpack Config', config, validators)
  t.true(consoleLogSpy.callCount === 0)

  consoleLogSpy.restore()
})
