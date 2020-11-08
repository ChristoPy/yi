const Template = require('../../../../src/compiler/parser/template')

test('[TEMPLATE] Parse template with simple text only', () => {
  const text = 'test string'
  const expected = { 'text-0': {} }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with binding text only', () => {
  const text = 'Hello, {{ name }}!'
  const expected = { 'text-0': {}, 'text-1': {}, 'text-2': {} }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with simple text before all tags', () => {
  const text = 'sample text<img src="logo.png"/>'
  const expected = {
    'text-0': {},
    'img-0': {},
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})
