import {get, reduce, isUndefined, toPath, take} from 'lodash'
import helper from '../helper'
export default validateWebpackConfig

function validateWebpackConfig(config = {}, {validators} = {}) {
  return reduce(validators, getValidatorReducer(config), {})
}

function getValidatorReducer(config) {
  return runValidator

  function runValidator(accumulator, validator, key) {
    const val = get(config, key)
    if (!isUndefined(val)) {
      const context = getContext(config, key)
      const result = validator(val, helper, context)
      if (result) {
        accumulator[key] = result
      }
    }
    return accumulator
  }
}

function getContext(config, key) {
  const path = toPath(key)
  const parentPath = take(path, path.length - 1)
  const parent = get(config, parentPath)
  return {
    key,
    parent,
    config,
  }
}
