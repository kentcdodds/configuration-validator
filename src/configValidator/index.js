import {groupBy} from 'lodash'
import checkConfig from '../checkConfig'
import uncoveredPaths from '../uncoveredPaths'
import formatMessagesAsString from '../formatMessagesAsString'

export default configValidator

function configValidator(configName, config, validators) {
  const uncoveredFieldsMessages = getWarningMessagesForUncoveredFields(config, validators)
  const validationMessages = checkConfig(config, validators)
  const messages = [...uncoveredFieldsMessages, ...validationMessages]
  const {warning: warnings = [], error: errors = []} = groupBy(messages, 'type')

  return {
    errors,
    warnings,
    warningMessage: formatMessagesAsString(warnings),
    errorMessage: formatMessagesAsString(errors),
  }
}

function getWarningMessagesForUncoveredFields(config, validators) {
  return uncoveredPaths(config, validators)
    .map(uncoveredPath => {
      return {
        key: uncoveredPath,
        message: 'Unknown key',
        type: 'warning',
      }
    })
}
