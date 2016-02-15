import test from 'ava'
import validateContext from '.'

test('passes with an absolute path', t => {
  const absolutePath = '/foo/bar/baz'
  const result = validateContext(absolutePath)
  t.ifError(result)
})

test('returns error if not given an absolute path', t => {
  const relativePath = 'foo/bar'
  const result = validateContext(relativePath)
  t.true(result instanceof Error)
})

