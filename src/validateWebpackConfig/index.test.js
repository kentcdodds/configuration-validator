import test from 'ava'
import {isMatch} from 'lodash'
import validateWebpackConfig from '.'

test('should default the API', t => {
  t.doesNotThrow(() => validateWebpackConfig())
})

test('can fail', t => {
  const contextStub = {
    validators: [
      {key: 'foo.bar.baz', validate: () => 'foo error', name: 'foo bar baz thing'},
    ],
  }
  const config = {foo: {bar: {baz: 'error stuff'}}}
  const result = validateWebpackConfig(config, contextStub)
  const [item] = result
  t.true(isMatch(item, {
    key: 'foo.bar.baz',
    message: 'foo error',
    value: 'error stuff',
    validatorName: 'foo bar baz thing',
  }))
})

test('can pass', t => {
  const contextStub = {
    validators: [
      {key: 'foo[0].boo', validate: () => undefined},
    ],
  }
  const config = {foo: 'working stuff'}
  const result = validateWebpackConfig(config, contextStub)
  noErrors(t, result)
})

test(`doesn't check non-existing keys`, t => {
  const contextStub = {
    validators: [
      {key: 'foo', validate: () => undefined},
      {key: 'baz', validate: () => 'baz error'},
    ],
  }
  const config = {foo: true}
  const result = validateWebpackConfig(config, contextStub)
  noErrors(t, result)
})

function noErrors(t, result) {
  t.true(result.length === 0)
}
