const { assert } = require('../../utils')

class Text {
  constructor(code, index = 0) {
    this.code = code
    this.index = index

    this.textStarted = 0
    this.startedBinding = 0

    this.data = []
  }

  next() {
    return this.code[this.index++]
  }

  parse() {
    this.textStarted = true
    let initial = this.index
    let next

    while(true) {
      next = this.next()

      // temporary
      if (!next) {
        break
      }

      // don't know if the best way to know that the text content ended is this
      if (next === '<') {
        assert(!this.startedBinding, 'EXPECTED_BINDING_END')
        break
      }

      if (this.startedBinding && next !== '}') {
        this.data[this.data.length - 1].content += next
        continue
      }

      if (next !== '{' && next !== '}') {
        if (!this.data.length) {
          this.data.push({ content: next, type: 'text' })
        } else {
          this.data[this.data.length - 1].content += next
        }
        continue
      }

      if (next === '{') {
        if (!this.startedBinding) {
          this.startedBinding = this.index
          this.data.push({ content: next, type: 'bind' })
          continue
        }
      }

      if (next === '}') {
        const lastToken = this.code[this.index - 2]
        const lastText = this.data[this.data.length - 1]

        if (lastToken !== '}') {
          this.startedBinding = 0
          lastText.content += next
          continue
        }
        if (this.startedBinding === 0) {
          lastText.content += next
          lastText.raw = lastText.content

          lastText.content = lastText.content.substring(2, lastText.content.length - 2).trim()

          this.data.push({ content: '', type: 'text' })
          continue
        }
      }
    }

    return this.data
  }
}

module.exports = Text
