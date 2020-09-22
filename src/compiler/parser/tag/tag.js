import { selfClosingTags, isQuote, assert } from '../../utils'

class Tag {
  constructor(index, source) {
    this.code = source
    this.index = index

    this.attributes = []
    this.open = false
    this.closed = false
    this.start = 0
    this.end = 0
    this.arguments = ''
    this.type = 'tag'
    this.selfClosing = null

    this.started = true
    this.startedArguments = null
    this.startedBinding = null
    this.startedEqual = null
    this.startedAttributes = null
  }

  // should be injected after
  next() {}

  parseEqual(content) {
    const attribute = {
      content,
      name: content
    }

    if (this.startedEqual) {
      attribute.value = this.source.substring(this.startedEqual + 1, this.end)
    }

    let lastCharacter = attribute.value.length - 1
    if (isQuote(attribute.value[lastCharacter])) {
      attribute.value = attribute.value.substring(0, lastCharacter)
    }

    return attribute
  }

  flush(shift = 0) {
    if (!this.startedAttributes) return

    this.end = this.index - 1 + shift
    const content = this.code.substring(this.startedAttributes, this.end)
  
    if (this.startedArguments === true) {
      this.startedArguments = content
      this.startedAttributes = null
      this.startedEqual = null
    }

    const attribute = this.parseEqual(content)

    this.attributes.push(attribute)
    this.startedAttributes = null
    this.startedEqual = false
  }

  parse() {
    let current = this.index
    let next = this.next()

    assert(next === '<', 'Malformed tag')

    while(true) {
      next = this.next()

      if (!this.started && !this.startedAttributes && next.match(/\S/) && next !== '/' && next !== '>') {
        this.startedAttributes = this.index - 1
      }

      if (isQuote(next)) {
        while (next !== this.next()) {
          continue
        }
      }

      if (this.startedBinding) {
        if (next === '}') {
          this.startedBinding = false
          this.flush(1)
        }
        continue
      }

      if (next === '{') {
        this.startedBinding = true
        continue
      }

      if (next === '<') {
        let error = new Error('Sorry, your tag is wrong')
        error.details = this.code.substring(current, this.end)
      }

      if (next === '/') {
       next = this.next()
       assert(next === '>')
       this.flush(-1) 
      }

      if (next === '>') {
        this.flush()

        const isSelfClosingTag = selfClosingTags.includes(this.name)
        const closedTag = isSelfClosingTag || this.code[this.index-2] == '/'

        this.closed = closedTag
        this.selfClosing = isSelfClosingTag
        this.end = this.index
        this.arguments = this.startedArguments
        this.open = this.code.substring(current, this.index)

        return this
      }

      if (this.started) {
        if (current.match(/[\da-zA-Z]/)) {
          this.name += current
          continue
        }

        this.started = false

        if (current === ':') {
          this.startedArguments = true
          this.startedAttributes = this.index
        }
      } else if (this.startedAttributes) {
        if (current === '=' && !this.startedEqual) {
          this.startedEqual = this.index - 1
        } else if (current.match(/\s/)) {
          this.flush()
        }
      }
    }
  }
}

module.exports = Tag
