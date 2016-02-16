import test from 'ava'
import messageFormatter from '.'

test('formats messages for errors', t => {
  const results = [
    {type: 'error', message: 'first error message', key: 'the.first.key'},
    {type: 'error', message: 'second error message', key: 'the.second.key'},
  ]
  const {error} = messageFormatter(results)
  t.ok(error.match(/the\.first\.key.*?first error message/))
  t.ok(error.match(/the\.second\.key.*?second error message/))
})

test('formats messages for warnings', t => {
  const results = [
    {type: 'warning', message: 'first warning message', key: 'the.first.key'},
    {type: 'warning', message: 'second warning message', key: 'the.second.key'},
  ]
  const {warning} = messageFormatter(results)
  t.ok(warning.match(/the\.first\.key.*?first warning message/))
  t.ok(warning.match(/the\.second\.key.*?second warning message/))
})
