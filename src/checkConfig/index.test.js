import test from 'ava'
import {isMatch} from 'lodash'
import checkConfig from '.'

test('can fail', t => {
  const validators = [
    {key: 'foo.bar.baz', validate: () => 'foo error', description: 'foo bar baz thing'},
  ]
  const config = {foo: {bar: {baz: 'error stuff'}}}
  const result = checkConfig(config, validators)
  const [item] = result
  t.true(isMatch(item, {
    key: 'foo.bar.baz',
    message: 'foo error',
    value: 'error stuff',
    validator: validators[0],
    type: 'error',
  }))
})

test('can pass', t => {
  const validators = [getPassingValidator({key: 'foo'})]
  const config = {foo: 'working stuff'}
  const result = checkConfig(config, validators)
  noErrors(t, result)
})

test('can warn', t => {
  const key = 'foo'
  const message = 'warning about foo'
  const value = 'foo value'
  const validators = [
    {
      key,
      validate: () => ({warning: message}),
    },
  ]
  const config = {[key]: value}
  const result = checkConfig(config, validators)
  const [warning] = result
  t.true(isMatch(warning, {
    key,
    message,
    value,
    validator: validators[0],
    type: 'warning',
  }))
})

test('doesnot check non-existing keys', t => {
  const validators = [
    getPassingValidator({key: 'foo'}),
    getFailingValidator({key: 'bar'}),
  ]
  const config = {foo: true}
  const result = checkConfig(config, validators)
  noErrors(t, result)
})

test('doesnot check non-exsisting validators', t => {
  const validators = [
    getFailingValidator({key: 'baz'}),
  ]
  const config = {foo: true}
  const result = checkConfig(config, validators)
  noErrors(t, result)
})

function noErrors(t, result) {
  t.true(result.length === 0)
}

function getFailingValidator(overrides) {
  return {
    key: 'failing.property',
    validate: () => 'failed prop',
    description: 'Always Failing Prop',
    ...overrides,
  }
}

function getPassingValidator(overrides) {
  return {
    key: 'passing.property',
    validate: () => undefined,
    description: 'Always Passing Prop',
    ...overrides,
  }
}

