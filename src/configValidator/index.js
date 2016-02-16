import checkConfig from '../checkConfig'
import messageFormatter from '../messageFormatter'

export default configValidator

function configValidator(configName, config, validators) {
  const results = checkConfig(config, validators)
  if (results.length) {
    const {error, warning} = messageFormatter(results)
    log(configName, error)
    log(configName, warning)
  }
}

function log(configName, message) {
  if (message) {
    message = message.replace(/\n/g, '\n\t')
    console.log(`${configName}:\n${message}`) // eslint-disable-line no-console
  }
}

