const { assert } = require('../../utils')
const { OPEN_TAG_EXPECTED, UNEXPECTED_TAG_OPEN } = require('../../error-messages')
const Text = require('../text')
const Tag = require('../tag')

class Template {
  constructor(code) {
    this.code = code
    this.index = 0

    this.start = 0
    this.end = 0

    this.componentStarted = 0
    this.templateStarted = 0
    this.scriptStarted = 0

    this.current = null

    this.data = {
      template: [],
      script: []
    }
  }

  next() {
    assert(this.index < this.code.length, 'EOF')
    return this.code[this.index++]
  }

  parseTag() {
    const codeToParse = this.code.substring(this.index, this.code.length)
    this.current = new Tag(codeToParse, 0)
    let result

    try {
      result = this.current.parse()
    } catch (error) {
      if (error !== OPEN_TAG_EXPECTED) {
        throw error
      }
    }

    if (result) {
      this.index = this.current.index + this.index
      this.end = this.index
      this.data.template.push(result)
    }
  }

  parseText() {
    const codeToParse = this.code.substring(this.index, this.code.length)
    this.current = new Text(codeToParse, 0)
    let result

    try {
      result = this.current.parse()
    } catch (error) {
      if (error !== UNEXPECTED_TAG_OPEN) {
        throw error
      }
    }

    if (result) {
      this.index = this.current.index + this.index
      this.end = this.index
      this.data.template.push(result)
    }
  }

  parse() {
    const initial = this.index

    while(true) {
      if (this.index === this.code.length) {
        break
      }

      this.parseTag()

      if (this.index === this.code.length) {
        break
      }

      this.parseText()
    }
  }
}

module.exports = Template
