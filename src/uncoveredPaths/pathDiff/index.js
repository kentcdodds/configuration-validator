import {toPath} from 'lodash'
export default pathDiff

function pathDiff(keysToCover, coverageKeys) {
  const pathsToCover = keysToCover.map(key => toPath(key))
  const coveragePaths = coverageKeys.map(key => toPath(key))

  const uncoveredPaths = pathsToCover.reduce(findUncoveredPathsReducer, [])
  return uncoveredPaths

  function findUncoveredPathsReducer(accumulator, currentPath, index) {
    if (!pathIsCovered(currentPath)) {
      accumulator.push(keysToCover[index])
    }
    return accumulator
  }

  function pathIsCovered(path) {
    return coveragePaths.some(coveragePath => {
      for (let i = 0; i < coveragePath.length && i < path.length; i++) {
        const coveragePathSegment = coveragePath[i]
        const pathSegment = path[i]
        if (coveragePathSegment !== pathSegment) {
          return false
        }
      }
      return true
    })
  }
}

