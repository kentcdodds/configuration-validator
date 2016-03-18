import test from 'ava'
import pathDiff from './index'

const coveredPaths = [
  {
    config: {
      bar: '',
      baz: false,
    },
    validators: [
      {key: 'bar'},
      {key: 'baz'},
    ],
  },
  {
    config: {
      bar: {
        baz: [],
      },
      foo: {
        foobar: false,
        spam: true,
      },
    },
    validators: [
      {key: 'bar.baz'},
      {key: 'foo'},
    ],
  },
]

coveredPaths.forEach(({config, validators}, index) => {
  test(`passing config/validator pair ${index} should pass`, t => {
    t.true(
      pathDiff(config, validators).length === 0,
      `config: ${JSON.stringify(config)} ; validators: ${JSON.stringify(validators)}`
    )
  })
})

const uncoveredPaths = [
  {
    config: {
      bar: '',
      baz: false,
    },
    validators: [
      {key: 'baz'},
    ],
  },
  {
    config: {
      bar: {
        baz: [],
      },
      foo: {
        foobar: false,
        spam: true,
      },
    },
    validators: [
      {key: 'bar.baz'},
      {key: 'foo.spam'},
    ],
  },
]

test('passing config/validator pairs should pass', t => {
  uncoveredPaths.forEach(({config, validators}) => {
    t.true(
      pathDiff(config, validators).length === 1,
      `config: ${JSON.stringify(config)} ; validators: ${JSON.stringify(validators)}`
    )
  })
})



