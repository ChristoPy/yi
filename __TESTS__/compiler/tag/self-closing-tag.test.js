const Tag = require('../../../src/compiler/parser/tag')
const { EOF } = require('../../../src/compiler/error-messages')

test('[TAG] Parse a self closing tag', () => {
  const TagParser = new Tag('<img/>')
  TagParser.parse()

  expect(TagParser.selfClosing).toBe(true)
})

test('[TAG] Detect the tag was closed', () => {
  const TagParser = new Tag('<img/>')
  TagParser.parse()

  expect(TagParser.closed).toBe(true)
})

test('[TAG] Detect wrong terminated tag', () => {
  const TagParser = new Tag('<base-component/')

  expect(() => TagParser.parse()).toThrow(EOF)
})
