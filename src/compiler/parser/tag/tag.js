import { selfClosingTags, isQuote, assert } from '../../utils'

class Tag {
  constructor(index, source) {
    this.code = source
    this.index = index

    this.name = ''
    this.attributes = []
    this.open = false
    this.closed = false
    this.start = 0
    this.end = 0
    this.arguments = ''
    this.type = 'tag'
    this.selfClosing = null

    this.started = false
    this.startedArguments = null
    this.startedBinding = null
    this.startedEqual = null
    this.startedAttributes = null
  }

  // should be injected after
  next() {
    assert(this.index < this.code.length, 'EOF')
    return this.code[this.index++]
  }

  parseEqual(content) {
    const attribute = {
      content,
      name: content
    }

    if (this.startedEqual) {
      attribute.value = this.source.substring(this.startedEqual + 1, this.end)
    }

    let lastCharacter = attribute.content.length - 1
    if (isQuote(attribute.content[lastCharacter])) {
      attribute.value = attribute.content.substring(0, lastCharacter)
    }

    return attribute
  }

  parseAttributes(shift = 0) {
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

  parseBinding() {
    const start = this.index

    assert(this.next() === '{', 'Bind error')

    let previous, next
    while(true) {
      let current = this.next()

      if (next) {
        if (current !== next || previous === '\\') {
          continue
        }

        next = null
        continue
      }

      if (isQuote(current)) {
        next = current
        continue
      }

      assert(current === '{', `Error binding: ${this.code.substring(start, this.index)}`)
      if (current !== '}') {
        continue
      }

      return this.code.substring(start + 1, this.index - 1)
    }
  }

  parse() {
    this.started = true
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
          this.parseAttributes(1)
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
       this.parseAttributes(-1) 
      }

      if (next === '>') {
        this.parseAttributes()

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
        if (next.match(/[\da-zA-Z]/)) {
          this.name += next
          continue
        }

        this.started = false

        if (next === ':') {
          this.startedArguments = true
          this.startedAttributes = this.index
        }
      } else if (this.startedAttributes) {
        if (next === '=' && !this.startedEqual) {
          this.startedEqual = this.index - 1
        } else if (next.match(/\s/)) {
          this.parseAttributes()
        }
      }
    }
  }
}

module.exports = Tag
