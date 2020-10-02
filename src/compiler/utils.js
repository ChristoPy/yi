const errorMessages = require('./error-messages') 

const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

const quotes = ["'", '"']

const attribute = /(^(([a-z]+)([-][a-z]+)*)$)/
const identifier = /(^((([a-z])+(\d|)+)([-][a-z]+)*)$)/
const closesTag = ['/', '>']


const assert = (value, errorName) => {
  if(!value) throw errorMessages[errorName] || (new Error('AssertError'));
}

const baseRegexTester = (value, regex) => {
  const match = value.match(regex)
  if (match) {
    return match.length > 0
  }
  return false
}

const isQuote =  (value) => quotes.includes(value)
const isTagCloser = (value) => closesTag.includes(value)
const isSelfClosingTag = (value) => selfClosingTags.includes(value)
const isAttribute = (value) => baseRegexTester(value, attribute)
const isIdentifier = (value) => baseRegexTester(value, identifier)

module.exports = {
  assert,
  isQuote,
  isTagCloser,
  isSelfClosingTag,
  isAttribute,
  isIdentifier
}
