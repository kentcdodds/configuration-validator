import chalk from 'chalk'

/**
 * @param {Array<Object>} messages: An array of message objects.
 * @returns {String} A colored string representation of the given message objects.
 */
export default function formatMessagesAsString(messages) {
  // Return undefined when there are no messages to format
  if (!messages.length) {
    return undefined
  }

  return messages.reduce(messageReducer, '')

  function messageReducer(accumulatorString, messageObject, index, array) {
    // Don't append newline to the last entry
    const newline = index === array.length - 1 ? '\n' : ''

    const formattedMessage = formatMessage(messageObject)
    return `${accumulatorString}${newline}${formattedMessage}\n`
  }
}

/**
 * @returns {String} A string displaying the color-coded key followed by the message string
 */
export function formatMessage({type, message, key}) {
  const keyColor = type === 'error' ? 'red' : 'yellow'
  const formattedKey = chalk.bold[keyColor](`${key}`)
  const formattedMessage = chalk.gray(message)
  return `${formattedKey}: ${formattedMessage}`
}
