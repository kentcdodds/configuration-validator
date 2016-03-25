import test from 'ava'
import chalk from 'chalk'
import formatMessagesAsString, {formatMessage} from './index'

test('returns a colored string for an array of message objects', t => {
  const errorMessages = [
    {type: 'error', message: 'error message', key: 'the.first.key'},
    {type: 'warning', message: 'warning message', key: 'the.second.key'},
  ]
  const messageString = formatMessagesAsString(errorMessages)
  const lines = messageString.split('\n')

  // Each error is formatted as a line followed by an empty line
  t.ok(lines.length === 4)

  t.ok(messageString.match(/the\.first\.key.*?error message/))
  t.ok(messageString.match(/the\.second\.key.*?warning message/))
})

test('warning message string representation', t => {
  const message = {type: 'warning', message: 'warning message', key: 'the.first.key'}
  const formattedMessage = formatMessage(message)
  const expectedColor = 'yellow'
  t.same(formattedMessage, `${chalk.bold[expectedColor](message.key)}: ${chalk.gray(message.message)}`)
})

test('error message string representation', t => {
  const message = {type: 'error', message: 'error message', key: 'the.first.key'}
  const formattedMessage = formatMessage(message)
  const expectedColor = 'red'
  t.same(formattedMessage, `${chalk.bold[expectedColor](message.key)}: ${chalk.gray(message.message)}`)
})
