import checkConfig from '../checkConfig'
import uncoveredPaths from '../uncoveredPaths'
import messageFormatter from '../messageFormatter'

export default configValidator

function configValidator(config, validators) {
  const uncoveredFields = getWarningsForUncoveredFields(config, validators)
  const results = checkConfig(config, validators)
  const totalResults = uncoveredFields.concat(results)
  if (totalResults.length) {
    const {error, warning} = messageFormatter(totalResults)
    log(error)
    log(warning)
    return {
      warnings: uncoveredFields.length,
      errors: results.length,
    }
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

function log(message) {
  if (message) {
    console.log(message) // eslint-disable-line no-console
  }
}
