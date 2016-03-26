export {validateReducer}

const EXIT_EARLY = 'EXIT_EARLY'
const CONTINUE = 'CONTINUE'

validateReducer.EXIT_EARLY = EXIT_EARLY
validateReducer.CONTINUE = CONTINUE

function validateReducer(validators, val, config) {
  const result = validators.reduce((res, validator) => {
    if (res !== CONTINUE) {
      return res
    }
    return validator(val, config)
  }, CONTINUE)

  if (result !== CONTINUE && result !== EXIT_EARLY) {
    return result
  } else {
    return undefined
  }
}

