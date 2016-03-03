import checkConfig from '../checkConfig'
import uncoveredPaths from '../uncoveredPaths'
import messageFormatter from '../messageFormatter'

export default configValidator

function configValidator(configName, config, validators) {
  const uncoveredFields = getWarningsForUncoveredFields(config, validators)
  const results = checkConfig(config, validators)
  const totalResults = uncoveredFields.concat(results)
  if (totalResults.length) {
    const {error, warning} = messageFormatter(totalResults)
    log(configName, error)
    log(configName, warning)
  }
}

function getWarningsForUncoveredFields(config, validators) {
  return uncoveredPaths(config, validators)
    .map(uncoveredPath => {
      return {
        key: uncoveredPath,
        message: 'Unknown key',
        type: 'warning',
      }
    })
}

function log(configName, message) {
  if (message) {
    console.log(`${configName}:\n${message}`) // eslint-disable-line no-console
  }
}
