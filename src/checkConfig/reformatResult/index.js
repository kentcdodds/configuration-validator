import {isString, isObject} from 'lodash'

export default reformatResult

function reformatResult(result, {description, key} = {}) {
  /* eslint complexity:[2, 6] */
  if (isString(result)) {
    return {type: 'error', message: result}
  } else if (isObject(result)) {
    if (result.error) {
      return {type: 'error', message: result.error}
    } else if (result.warning) {
      return {type: 'warning', message: result.warning}
    }
  }
  throw new Error([
    'config-validator is returning a non-string non-conforming object.',
    `Returned: ${JSON.stringify(result)} for ${description || key}`,
  ].join(' '))
}



