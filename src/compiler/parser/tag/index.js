import { selfClosingTags, isQuote, assert } from '../../utils'

class Tag {
  constructor(code, index = 0) {
    this.code = code
    this.index = 0

    this.open = false
    this.closed = false
    this.selfClosing = false
    this.start = 0
    this.end = 0

    this.tagStarted = 0
    this.attributeStarted = 0
    this.equalStarted = 0
    this.valueStarted = 0

    this.data = {
      name: '',
      type: 'tag',
      attributes: {}
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
        attribute.value = this.parseValue()
        break
      } else {
        assert(next !== '=', `Wait right there, what you're doing with your attribute?`)
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

    assert(next === '<', 'Sorry, I exprected a tag to open here...')

    while(true) {
      next = this.next()

      if (!this.tagStarted && !this.attributeStarted && next.match(/\S/) && next !== '/' && next !== '>') {
        this.attributeStarted = this.index - 1
      }

      if (next === '<') {
        let error = new Error('Sorry, I was specting a tag opening here...')
        error.details = this.code.substring(initial, this.end)
      }

      if (next === '/') {
        next = this.next()
        assert(next === '>', 'Your tag may be closing on the wrong side...')
      }

      if (next === '>') {
        const isSelfClosingTag = selfClosingTags.includes(this.data.name)
        const closedTag = isSelfClosingTag || this.code[this.index-2] == '/'

        this.selfClosing = isSelfClosingTag
        this.open = this.code.substring(initial, this.index)
        this.closed = closedTag
        this.end = this.index

        return this.data
      }

      if (this.tagStarted) {
        if (next.match(/[\da-zA-Z]/)) {
          this.data.name += next
          continue
        }

        this.tagStarted = false
      } else if (this.attributeStarted) {
        assert(next.match(/\S/), 'Sorry, I was expecting your attribute to start here...')
        this.parseAttribute()
      }
    }
  }
}

module.exports = Tag
