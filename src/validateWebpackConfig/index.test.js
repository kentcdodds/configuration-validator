import test from 'ava'
import validateWebpackConfig from '.'

test('should default the API', t => {
  t.doesNotThrow(() => validateWebpackConfig())
})

test('can fail', t => {
  const contextStub = {
    validators: {
      foo: () => new Error('foo error'),
    },
  }
  const config = {foo: 'error stuff'}
  const result = validateWebpackConfig(config, contextStub)
  t.true(result.foo instanceof Error)
})

test('can pass', t => {
  const contextStub = {
    validators: {
      foo: () => undefined,
    },
  }
  const config = {foo: 'working stuff'}
  const result = validateWebpackConfig(config, contextStub)
  noErrors(t, result)
})

test(`doesn't check non-existing keys`, t => {
  const contextStub = {
    validators: {
      foo: () => undefined,
      baz: () => new Error('baz error'),
    },
  }
  const config = {foo: true}
  const result = validateWebpackConfig(config, contextStub)
  noErrors(t, result)
})

function noErrors(t, result) {
  t.true(Object.keys(result).length === 0)
}
