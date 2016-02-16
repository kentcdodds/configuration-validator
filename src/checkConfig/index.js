import {get, reduce, isUndefined, toPath, take} from 'lodash'
import reformatResult from './reformatResult'

export default checkConfig

function checkConfig(config, validators) {
  return reduce(validators, getValidatorReducer(config), [])
}

function getValidatorReducer(config) {
  return validatorReducer

  function validatorReducer(accumulator, validator) {
    const {key} = validator
    const value = get(config, key)
    if (!isUndefined(value)) {
      const context = getContext(config, key)
      const result = validator.validate(value, context)
      if (result) {
        const {message, type} = reformatResult(result, validator)
        accumulator.push({
          key,
          message,
          value,
          validator,
          type,
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
