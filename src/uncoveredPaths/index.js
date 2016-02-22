import {uniq} from 'lodash'
import pathDiff from './pathDiff'
import getAllPaths from './getAllPaths'

export default uncoveredPaths

function uncoveredPaths(config, validators) {
  const allPaths = getAllPaths(config)
  const validatedPaths = uniq(validators.map(v => v.key))
  return pathDiff(allPaths, validatedPaths)
}

