const Tag = require('../../../../src/compiler/parser/tag')
const { INVALID_TAG_NAME } = require('../../../../src/compiler/error-messages')

test('[TAG] Parse the tag name without dashes', () => {
  const TagParser = new Tag('<p/>')
  const parsedData = TagParser.parse()

  expect(parsedData.name).toBe('p')
})

test('[TAG] Parse the tag name with dashes', () => {
  const TagParser = new Tag('<base-component/>')
  const parsedData = TagParser.parse()

  expect(parsedData.name).toBe('base-component')
})

test('[TAG] Detect wrong tag name', () => {
  const TagParser = new Tag('<base-component-/>')

  expect(() => TagParser.parse()).toThrow(INVALID_TAG_NAME)
})
