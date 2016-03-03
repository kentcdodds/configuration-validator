import chalk from 'chalk'
import {groupBy} from 'lodash'

export default messageFormatter

function messageFormatter(results) {
  const {warning: warnings = [], error: errors = []} = groupBy(results, 'type')
  const error = errors.reduce(messageReducer, '')
  const warning = warnings.reduce(messageReducer, '')
  return {error, warning}
}

function messageReducer(string, {key, message, type}, index, array) {
  const newline = index === array.length - 1 ? '\n' : ''
  const highlight = type === 'error' ? 'red' : 'yellow'
  const keyPart = chalk.bold[highlight](`${key}`)
  const messagePart = chalk.gray(message)
  return `${string}${newline}${keyPart}: ${messagePart}\n`
}

