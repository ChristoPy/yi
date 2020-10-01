const Tag = require('../../../src/compiler/parser/tag')
const { UNEXPECTED_ATTRIBUTE } = require('../../../src/compiler/error-messages')

test('[TAG] Parse a closing tag', () => {
  const TagParser = new Tag('</h1>')
  TagParser.parse()

  expect(TagParser.closingStarted).toBe(true)
})

test('[TAG] Detect unexpected attribute', () => {
  const TagParser = new Tag('</avatar class="logo">')

  expect(() => TagParser.parse()).toThrow(UNEXPECTED_ATTRIBUTE)
})
