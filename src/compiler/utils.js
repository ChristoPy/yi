const errorMessages = require('./error-messages') 

const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

const quotes = ["'", '"']

const identifier = /(^(([a-z]+)([-][a-z]+)*)$)/
const closesTag = ['/', '>']


const assert = (value, errorName) => {
  if(!value) throw errorMessages[errorName] || (new Error('AssertError'));
}

const isQuote =  (value) => quotes.includes(value)
const isTagCloser = (value) => closesTag.includes(value)
const isSelfClosingTag = (value) => selfClosingTags.includes(value)
const isIdentifier = (value) => {
  const match = value.match(identifier)
  if (match) {
    return match.length > 0
  }
  return false
}

module.exports = {
  assert,
  isQuote,
  isTagCloser,
  isSelfClosingTag,
  isIdentifier,
}
