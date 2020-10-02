const { isSelfClosingTag, isQuote, assert, isTagCloser, isIdentifier, isAttribute } = require('../../utils')

class Tag {
  constructor(code, index = 0) {
    this.code = code
    this.index = index

    this.open = false
    this.closed = false
    this.selfClosing = false
    this.start = 0
    this.end = 0

    this.tagStarted = 0
    this.attributeStarted = 0
    this.equalStarted = 0
    this.valueStarted = 0
    this.closingStarted = 0

    this.data = {
      name: '',
      type: 'tag',
      attributes: {},
      selfClosing: false,
      tagCloser: false
    }
  }

  parseValue(shift = 0) {
    const initial = this.index - 1 + shift
    let next = this.code.substring(initial, initial + 1)

    let value = ''

    while(true) {
      if (next === '=' && !this.equalStarted) {
        this.equalStarted = this.index - 1
      }
  
      if (isQuote(next)) {
        this.valueStarted = this.index - 1
        while(next !== this.next()) {
          continue
        }

        value += this.code.substring(this.valueStarted, this.index)
        this.equalStarted = 0
        this.valueStarted = 0
        break
      }
      next = this.next()
    }
    return value
  }

  parseAttribute(shift = 0) {
    const initial = this.index - 1 + shift
    let next = this.code.substring(initial, initial + 1)

    const attribute = {
      name: '',
      value: ''
    }

    while(true) {
      if (next !== '=') {
        attribute.name += next
        next = this.next()
      } else if (next === '=' && !this.equalStarted) {
        assert(isAttribute(attribute.name), 'INVALID_ATTRIBUTE')
        attribute.value = this.parseValue()
        break
      } else {
        assert(next !== '=', 'ATTRIBUTE_VALUE_EXPECTED')
      }
    }

    this.data.attributes[attribute.name] = attribute
    this.attributeStarted = 0
    this.tagStarted = true
  }

  next() {
    assert(this.index < this.code.length, 'EOF')
    return this.code[this.index++]
  }

  parse() {
    this.tagStarted = true
    let initial = this.index
    let next = this.next()

    assert(next === '<', 'OPEN_TAG_EXPECTED')

    while(true) {
      next = this.next()

      if (!this.tagStarted && !this.attributeStarted && next.match(/[\da-zA-Z]/) && !isTagCloser(next)) {
        assert(isIdentifier(this.data.name), 'INVALID_TAG_NAME')
        this.attributeStarted = this.index - 1
      }

      assert(next !== '<', 'TAG_ALREADY_OPEN')

      if (next === '/') {
        if (!this.data.name.length && !this.closingStarted) {
          this.closingStarted = true
          continue
        }
        assert(isIdentifier(this.data.name), 'INVALID_TAG_NAME')

        next = this.next()
        assert(next === '>', 'CLOSE_TAG_EXPECTED')
      }

      if (next === '>') {
        const selfClosing = isSelfClosingTag(this.data.name)
        const closedTag = selfClosing || this.code[this.index-2] == '/'

        this.selfClosing = selfClosing || closedTag
        this.open = this.code.substring(initial, this.index)
        this.closed = closedTag
        this.end = this.index

        this.data.selfClosing = this.selfClosing
        this.data.tagCloser = this.closingStarted || false

        return this.data
      }

      if (this.tagStarted) {
        const nextMatches = next.match(/[\da-zA-Z]/)
        const nameIsValid = this.data.name.length >= 1 && next === '-'

        if (nextMatches || nameIsValid) {
          this.data.name += next
          continue
        }

        this.tagStarted = false
      } else if (this.attributeStarted) {
        assert(!this.closingStarted, 'UNEXPECTED_ATTRIBUTE')
        assert(isAttribute(next), 'ATTRIBUTE_EXPECTED')

        this.parseAttribute()
      } else {
        // Here it already knows that the attribute is invalid
        // the assert is just to throw the error nicely
        assert(isAttribute(next), 'INVALID_ATTRIBUTE')
      }
    }
  }
}

module.exports = Tag
