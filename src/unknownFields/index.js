export default getUnknownFields

function getConfigKeys(config, base = '') {
  return flatten(Object.keys(config).map(key => {
    const val = config[key]
    const path = base ? `${base}.${key}` : key
    if (!val || Array.isArray(val) || (typeof val !== 'object')) {
      return path
    }
    return getConfigKeys(config[key], path)
  }))
}

function flatten(arr) {
  return arr.reduce((a, b) => a.concat(b), [])
}

function getUnknownFields(config, validators) {
  const validatedKeys = validators.map(x => x.key)
      .reduce((arr, curr) => (arr[curr] = curr, arr), {})
  const configKeys = getConfigKeys(config)
  return configKeys.filter(key => !validatedKeys[key])
      .map(field => ({type: 'warning', key: field, message: 'Unknown field'}))
}
