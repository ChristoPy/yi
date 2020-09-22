const selfClosingTags = ['fragment', 'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

const quotes = ["'", '"']

const assert = (value, information) => {
  if(!value) throw information || (new Error('AssertError'));
}

const isQuote =  (value) => quotes.includes(value)

module.exports = {
  selfClosingTags,
  isQuote,
  assert,
}
