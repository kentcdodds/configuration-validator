import {get, reduce, isUndefined, toPath, take} from 'lodash'
export default validateWebpackConfig

function validateWebpackConfig(config = {}, {validators} = {}) {
  return reduce(validators, getValidatorReducer(config), [])
}

function getValidatorReducer(config) {
  return validatorReducer

  function validatorReducer(accumulator, validator) {
    const {key} = validator
    const value = get(config, key)
    if (!isUndefined(value)) {
      const context = getContext(config, key)
      const message = validator.validate(value, context)
      if (message) {
        accumulator.push({
          key,
          message,
          value,
          validatorName: validator.name,
        })
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
