const { assert } = require('../../utils')
const { OPEN_TAG_EXPECTED } = require('../../error-messages')
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
    this.current = new Tag(this.code, this.index <= 0 ? this.index  : this.index - 1)
    let result

    try {
      result = this.current.parse()
    } catch (error) {
      if (error !== OPEN_TAG_EXPECTED) {
        throw error
      }
    }

    if (result) {
      this.index = this.current.index
      this.end = this.index
      this.data.template.push(result)
    }
  }

  parseText() {
    this.current = new Text(this.code, this.index <= 0 ? this.index  : this.index - 1)
    let result

    try {
      result = this.current.parse()
    } catch (error) {
      throw error
    }

    if (result) {
      this.index = this.current.index
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
