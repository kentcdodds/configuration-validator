import test from 'ava'
import {isMatch} from 'lodash'
import reformatResult from '.'

test('throws an error with a result of the incorrect type', t => {
  const resultStub = false
  const validator = {key: 'the key'}
  t.throws(
    () => reformatResult(resultStub, validator),
    /config-validator.*?false.*?the key/
  )
})

test('throws an error with an improper object result', t => {
  const resultStub = {bar: 'baz'}
  const validator = {description: 'the description'}
  t.throws(
    () => reformatResult(resultStub, validator),
    /config-validator.*?\{"bar":"baz"\}.*?the description/
  )
})

test('returns a type error and message of result if result is a string', t => {
  const resultStub = 'result stub'
  const result = reformatResult(resultStub)
  t.true(isMatch(result, {
    type: 'error',
    message: 'result stub',
  }))
})

test('returns a type error and message of result.error', t => {
  const resultStub = {error: 'result error'}
  const result = reformatResult(resultStub)
  t.true(isMatch(result, {
    type: 'error',
    message: 'result error',
  }))
})

test('returns a type warning and error of result.error', t => {
  const resultStub = {error: 'result error'}
  const result = reformatResult(resultStub)
  t.true(isMatch(result, {
    type: 'error',
    message: 'result error',
  }))
})

test('returns a type warning and message of result.warning', t => {
  const resultStub = {warning: 'result warning'}
  const result = reformatResult(resultStub)
  t.true(isMatch(result, {
    type: 'warning',
    message: 'result warning',
  }))
})




