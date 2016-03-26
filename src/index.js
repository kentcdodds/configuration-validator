import configValidator from './configValidator'

import checkConfig from './checkConfig'
import messageFormatter from './messageFormatter'
import uncoveredPaths from './uncoveredPaths'
import validateReducer from './validateReducer'

module.exports = configValidator
module.exports.checkConfig = checkConfig
module.exports.messageFormatter = messageFormatter
module.exports.uncoveredPaths = uncoveredPaths
module.exports.validateReducer = validateReducer

