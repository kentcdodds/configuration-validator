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
