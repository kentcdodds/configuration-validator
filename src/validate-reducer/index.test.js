import test from 'ava'
import {spy} from 'sinon'

import {validateReducer} from './'
const {EXIT_EARLY, CONTINUE} = validateReducer

test('returns the message of the first message returning validator', t => {
  const warning = {warning: 'WATCH OUT!'}

  const v1 = spy(() => CONTINUE)
  const v2 = spy(() => warning)
  const v3 = spy(() => CONTINUE)
  const result = validateReducer([v1, v2, v3])
  t.same(result, warning)
  t.true(v1.calledOnce)
  t.true(v2.calledOnce)
  t.false(v3.called)
})

test('calls all validators if they all return continue', t => {
  const v1 = spy(() => CONTINUE)
  const v2 = spy(() => CONTINUE)
  const v3 = spy(() => CONTINUE)
  const result = validateReducer([v1, v2, v3])
  t.same(result, undefined)
  t.true(v1.calledOnce)
  t.true(v2.calledOnce)
  t.true(v3.calledOnce)
})

test('stops calling validators when the first validator that returns EXIT_EARLY is called', t => {
  const v1 = spy(() => CONTINUE)
  const v2 = spy(() => EXIT_EARLY)
  const v3 = spy(() => CONTINUE)
  const result = validateReducer([v1, v2, v3])
  t.same(result, undefined)
  t.true(v1.calledOnce)
  t.true(v2.calledOnce)
  t.false(v3.called)
})

test('stops calling validators when the first validator that returns a string is called', t => {
  const interestingFact = 'The tallest artificial structure is the 829.8 m (2,722 ft) tall Burj Khalifa in Dubai, United Arab Emirates' // eslint-disable-line max-len

  const v1 = spy(() => CONTINUE)
  const v2 = spy(() => interestingFact)
  const v3 = spy(() => CONTINUE)
  const result = validateReducer([v1, v2, v3])
  t.same(result, interestingFact)
  t.true(v1.calledOnce)
  t.true(v2.calledOnce)
  t.false(v3.called)
})

/*
 * This test is basically to tell you that returning `undefined` is just like returning
 * EXIT_EARLY, except it's less explicit which is not cool 👎
 */
test('stops calling validators when the first validator that returns nothing is called', t => {
  const v1 = spy(() => CONTINUE)
  const v2 = spy(() => undefined)
  const v3 = spy(() => CONTINUE)
  const result = validateReducer([v1, v2, v3])
  t.same(result, undefined)
  t.true(v1.calledOnce)
  t.true(v2.calledOnce)
  t.false(v3.called)
})

