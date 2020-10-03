const Text = require('../../../src/compiler/parser/text')
const { UNEXPECTED_TAG_OPEN } = require('../../../src/compiler/error-messages')

test('[TEXT] Parse simple text', () => {
  const text = 'test string'
  const expected = { content: text, type: 'text' }

  const TextParser = new Text(text)
  const parsedData = TextParser.parse()

  expect(parsedData.length).toBe(1)
  expect(parsedData[0]).toEqual(expected)
})

test('[TEXT] Detect another tag started', () => {
  const text = 'test string <p>'

  const TextParser = new Text(text)

  expect(() => TextParser.parse()).toThrow(UNEXPECTED_TAG_OPEN)
})
