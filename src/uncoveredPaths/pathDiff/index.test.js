import test from 'ava'
import pathDiff from '.'

const coveredPaths = [
  [
    [],
    [],
  ],
  [
    [],
    ['foo'],
  ],
  [
    ['foo'],
    ['foo'],
  ],
  [
    ['foo'],
    ['foo', 'bar'],
  ],
  [
    ['foo.baz', 'foo.bar'],
    ['foo'],
  ],
  [
    ['foo.bat', 'foo.buz', 'foo.foo.bar', 'foo.foo.baz'],
    ['foo.bat', 'foo.buz', 'foo.foo'],
  ],
]

test('covered config/validator pairs should pass', t => {
  coveredPaths.forEach(([config, validators]) => {
    t.true(pathDiff(config, validators).length === 0, `config: ${config} ; validators: ${validators}`)
  })
})

const uncoveredPaths = [
  [
    ['foo'],
    [],
  ],
  [
    ['foo'],
    ['bar'],
  ],
  [
    ['foo.baz', 'foo.bar'],
    ['foo.baz'],
  ],
  [
    ['foo.bat', 'foo.buz', 'foo.foo.bar', 'foo.foo.baz'],
    ['foo.bat', 'foo.buz', 'foo.foo.baz'],
  ],
]

test('uncovered config/validator pairs should fail', t => {
  uncoveredPaths.forEach(([config, validators]) => {
    t.true(pathDiff(config, validators).length === 1, `config: ${config} ; validators: ${validators}`)
  })
})

