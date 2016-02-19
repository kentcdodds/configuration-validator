/* eslint no-console:0 */
import test from 'ava'
import unknownFields from '.'

test('unknown fields', t => {
  const config = {bar: 'baz', cat: 'bag'}
  const validators = [{key: 'bar', validate: () => 'error'}]
  const warnings = unknownFields(config, validators)
  t.true(warnings.length === 1)
})

test('nested fields should not trigger', t => {
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
  const warnings = unknownFields(config, validators)
  t.true(warnings.length === 0)
})

test('null fields should not trigger', t => {
  const config = {
    foo: null,
    help: 'me',
  }
  const validators = [
    {key: 'foo', validate() {}},
    {key: 'help', validate() {}},
  ]
  const warnings = unknownFields(config, validators)
  t.true(warnings.length === 0)
})

test('arrays fields should not have nested checks', t => {
  const config = {
    foo: null,
    help: ['me', 'you', 'them'],
  }
  const validators = [
    {key: 'foo', validate() {}},
    {key: 'help', validate() {}},
  ]
  const warnings = unknownFields(config, validators)
  t.true(warnings.length === 0)
})

test('nested fields can trigger though when not validated', t => {
  const config = {
    foo: {
      bar: true,
      baz: 23,
    },
  }
  const validators = [
    {key: 'foo.bar', validate() {}},
  ]
  const warnings = unknownFields(config, validators)
  t.true(warnings.length === 1)
})

test('nesteder fields can trigger though when not validated', t => {
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
  const warnings = unknownFields(config, validators)
  t.true(warnings.length === 1)
})
