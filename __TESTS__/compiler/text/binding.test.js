const Text = require('../../../src/compiler/parser/text')
const { EXPECTED_BINDING_END } = require('../../../src/compiler/error-messages')

test('[BIND] Parse simple binding', () => {
  const text = '{{ name }}'
  const expected = { raw: '{{ name }}', content: 'name', type: 'bind' }

  const TextParser = new Text(text)
  const parsedData = TextParser.parse()

  expect(parsedData.length).toBe(1)
  expect(parsedData[0]).toEqual(expected)
})

test('[BIND] Parse mixed text and binding', () => {
  const text = 'Hello, {{ name }}!'
  const expected = { raw: '{{ name }}', content: 'name', type: 'bind' }

  const TextParser = new Text(text)
  const parsedData = TextParser.parse()
  expect(parsedData.length).toBe(3)
  expect(parsedData[1]).toEqual(expected)
})

test('[BIND] Invalidates unclosed binding', () => {
  const text = 'Hello, {{ name'

  const TextParser = new Text(text)

  expect(() => TextParser.parse()).toThrow(EXPECTED_BINDING_END)
})