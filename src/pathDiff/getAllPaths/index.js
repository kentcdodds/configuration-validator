/* istanbul ignore next TODO remove this line! */
import {isPlainObject, isEmpty} from 'lodash'

export default getAllPaths

function getAllPaths(object) {
  if (!isPlainObject(object) || isEmpty(object)) {
    return []
  }
  return Object.keys(object).reduce(allPathsReducer, [])

  // something to consider... I'm thinking of using recurssion but
  // that could be a problem on big objects... Maybe a while loop instead?
  function allPathsReducer(accumulator, key) {
    const val = object[key]
    if (isPlainObject(val)) {
      // TODO add this key to a path and continue looking
    }
    // TODO add to the accumulator all the paths as deep as possible.
  }
}


