import {groupBy} from 'lodash'
import checkConfig from '../checkConfig'
import uncoveredPaths from '../uncoveredPaths'
import formatMessagesAsString from '../formatMessagesAsString'

export default configValidator

function configValidator(configName, config, validators) {
  const uncoveredFieldsWarnings = getWarningsForUncoveredFields(config, validators)
  const validationWarningsAndErrors = checkConfig(config, validators)
  const warningsAndErrors = [...uncoveredFieldsWarnings, ...validationWarningsAndErrors]
  const {warning: warnings = [], error: errors = []} = groupBy(warningsAndErrors, 'type')

  return {
    errors,
    warnings,
    warningMessage: formatMessagesAsString(warnings),
    errorMessage: formatMessagesAsString(errors),
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
