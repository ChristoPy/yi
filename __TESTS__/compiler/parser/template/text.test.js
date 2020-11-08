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

test('[TEMPLATE] Parse template with simple text after all tags', () => {
  const text = '<img src="logo.png"/> sample text'
  const expected = {
    'img-0': {},
    'text-0': {},
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with binding text before all tags', () => {
  const text = 'Hello, {{ name }}!<button>logout</button>'
  const expected = {
    'text-0': {},
    'text-1': {},
    'text-2': {},
    'button-0': {
      'text-3': {},
    },
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with binding text after all tags', () => {
  const text = '<button>logout</button>Hello, {{ name }}!'
  const expected = {
    'button-0': {
      'text-0': {},
    },
    'text-1': {},
    'text-2': {},
    'text-3': {},
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})

test('[TEMPLATE] Parse template with nested tags and texts', () => {
  const text = '<main><h1>awsome test</h1><div class="card"><h3 class="card title">Card title</h3><p>content</p></div> some text to ensure its working</main>'
  const expected = {
    'main-0': {
      'h1-0': {
        'text-0': {},
      },
      'div-0': {
        'h3-0': {
          'text-1': {},
        },
        'p-0': {
          'text-2': {},
        },
      },
      'text-3': {}
    },
  }

  const TemplateParser = new Template(text)
  TemplateParser.parse()

  expect(TemplateParser.tree).toEqual(expected)
})
