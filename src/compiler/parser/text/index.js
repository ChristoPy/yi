const { assert, isWhiteSpace } = require('../../utils')

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

  skipWhiteSpaces() {
    let last = this.code[this.index]
    let current = isWhiteSpace(this.next())
    let iterations = 0

    if (isWhiteSpace(last)) {
      while(current) {
        last = current
        current = isWhiteSpace(this.next())
        iterations += 1
      }

      if (iterations > 0) {
        this.index -= 2
      } else {
        this.index -= 1
      }
    } else {
      this.index -= 1
    }
  }

  parse() {
    let initial = this.index
    let next

    while(true) {
      if (!this.startedBinding && !this.textStarted) {
        this.skipWhiteSpaces()
      }
      next = this.next()

      // temporary
      if (!next) {
        if (!this.textStarted) break

        const lastText = this.data[this.data.length - 1]
        if (lastText.type === 'text' && lastText.content.length === 0) {
          this.data.pop()
        }
        assert(!this.startedBinding, 'EXPECTED_BINDING_END')
        break
      }

      if (isWhiteSpace(next)) {
        this.skipWhiteSpaces()

        if (!this.startedBinding && !this.textStarted) {
          continue
        }
      }

      // Maybe now, semantically, I can know when the text content started
      this.textStarted = true

      // don't know if the best way to know that the text content ended is this
      if (next === '<') {
        this.index > 0 ? this.index -= 1 : null

        const lastText = this.data[this.data.length - 1]
        if (lastText && lastText.type === 'text' && lastText.content.length === 0) {
          this.data.pop()
        }

        assert(!this.startedBinding, 'EXPECTED_BINDING_END')
        // It already knows about the error, just throwing nicely
        assert(next !== '<', 'UNEXPECTED_TAG_OPEN')
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
        assert(!this.startedBinding, 'EXPECTED_BINDING_END')

        this.startedBinding = this.index
        this.data.push({ content: next, type: 'bind' })
        continue
      }

      if (next === '}') {
        const lastToken = this.code[this.index - 2]
        const lastText = this.data[this.data.length - 1]

        if (lastToken !== '}') {
          this.startedBinding = 0
          lastText.content += next
          continue
        }
        if (!this.startedBinding) {
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
