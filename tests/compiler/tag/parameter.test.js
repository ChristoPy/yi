const Tag = require('../../../src/compiler/parser/tag')
const { INVALID_ATTRIBUTE } = require('../../../src/compiler/error-messages')

test('[TAG] Parse the tag parameter without dashes', () => {
  const TagParser = new Tag('<img src="logo.png"/>')
  const parsedData = TagParser.parse()

  const expectedAttributes = {
    src: {
      name: 'src',
      value: '\"logo.png\"',
    },
  }

  expect(parsedData.attributes).toEqual(expectedAttributes)
})

test('[TAG] Parse the tag parameter with dashes', () => {
  const TagParser = new Tag('<img default-src="logo.png"/>')
  const parsedData = TagParser.parse()

  const expectedAttributes = {
    'default-src': {
      name: 'default-src',
      value: '\"logo.png\"',
    },
  }

  expect(parsedData.attributes).toEqual(expectedAttributes)
})

test('[TAG] Detect wrong parameter name', () => {
  const TagParser = new Tag('<img -default-src="logo.png"/>')

  expect(() => TagParser.parse()).toThrow(INVALID_ATTRIBUTE)
})
