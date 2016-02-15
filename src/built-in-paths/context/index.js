import {isAbsolute} from 'path'
export default validateContext

function validateContext(val) {
  if (!isAbsolute(val)) {
    return new Error('context must be an absolute path') // TODO figure out a good error message...
  }
}
