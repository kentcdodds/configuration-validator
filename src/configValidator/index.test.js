/* eslint no-console:0 */
import test from 'ava'
import sinon from 'sinon'
import configValidator from '.'

let originalConsole

test('no log with no error or messages', t => {
  setup()
  configValidator('Webpack Config', {}, [])
  t.false(console.log.called)
  cleanUp()
})

test('logs error messages', t => {
  setup()
  const config = {bar: 'baz'}
  const validators = [{key: 'bar', validate: () => 'error'}]
  configValidator('Webpack Config', config, validators)
  t.true(console.log.calledOnce)
  t.true(console.log.calledWithMatch(/Webpack Config[\s\S]*?bar[\s\S]*?error/))
  cleanUp()
})

test('unknown fields', t => {
  setup()
  const config = {bar: 'baz', cat: 'bag'}
  const validators = [{key: 'bar', validate: () => 'error'}]
  configValidator('Webpack Config', config, validators)
  t.true(console.log.calledWithMatch(/Webpack Config[\s\S]*?bar[\s\S]*?error/))
  cleanUp()
})

test('nested fields should not trigger', t => {
  setup()
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
  configValidator('Webpack Config', config, validators)
  t.false(console.log.called)
  cleanUp()
})

test('null fields should not trigger', t => {
  setup()
  const config = {
    foo: null,
    help: 'me',
  }
  const validators = [
    {key: 'foo', validate() {}},
    {key: 'help', validate() {}},
  ]
  configValidator('Webpack Config', config, validators)
  t.false(console.log.called)
  cleanUp()
})

test('arrays fields should not have nested checks', t => {
  setup()
  const config = {
    foo: null,
    help: ['me', 'you', 'them'],
  }
  const validators = [
    {key: 'foo', validate() {}},
    {key: 'help', validate() {}},
  ]
  configValidator('Webpack Config', config, validators)
  t.false(console.log.called)
  cleanUp()
})

test('nested fields can trigger though when not validated', t => {
  setup()
  const config = {
    foo: {
      bar: true,
      baz: 23,
    },
  }
  const validators = [
    {key: 'foo.bar', validate() {}},
  ]
  configValidator('Webpack Config', config, validators)
  t.true(console.log.calledOnce)
  cleanUp()
})

test('nesteder fields can trigger though when not validated', t => {
  setup()
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
  configValidator('Webpack Config', config, validators)
  t.true(console.log.calledTwice)
  cleanUp()
})

test('logs warning messages', t => {
  setup()
  const config = {bar: 'baz'}
  const validators = [{key: 'bar', validate: () => ({warning: 'warning'})}]
  configValidator('Webpack Config', config, validators)
  t.true(console.log.calledOnce)
  t.true(console.log.calledWithMatch(/Webpack Config[\s\S]*?bar[\s\S]*?warning/))
  cleanUp()
})

function setup() {
  originalConsole = console.log
  console.log = sinon.spy()
}

function cleanUp() {
  console.log = originalConsole
}
