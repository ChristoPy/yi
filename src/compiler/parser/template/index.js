const { assert, pathToTree } = require('../../utils')
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
    this.lastTag = null
    this.path = ''

    this.tags = {}

    this.data = {}
  }

  next() {
    assert(this.index < this.code.length, 'EOF')
    return this.code[this.index++]
  }

  updateTagCount(tag) {
    if (!this.tags[tag]) {
      this.tags[tag] = 0
    } else {
      this.tags[tag] += 1
    }
  }

  updatePathFromTag(tag) {
    const quantityOfTexts = this.tags[tag]
    const tagIdentifier = `${tag}-${quantityOfTexts}`
    this.path += (this.path.length ? `.${tagIdentifier}` : tagIdentifier)
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

      if ((this.lastTag === result.name) || (result.tagCloser)) {
        this.lastTag = null

        const splittedTree = this.path.split('.')
        this.path = splittedTree.slice(0, splittedTree.length - 1).join('.')
        return
      }

      // add self closing support
      this.updateTagCount(result.name)
      this.updatePathFromTag(result.name)

      this.data = pathToTree(this.path, this.data, result)
      this.lastTag = result.name
    }
  }

  parseText() {
    const codeToParse = this.code.substring(this.index, this.code.length)
    this.current = new Text(codeToParse, 0)

    try {
      this.current.parse()
    } catch (error) {
      if (error !== UNEXPECTED_TAG_OPEN) {
        throw error
      }
    }

    const result = this.current.data
    if (result.length) {
      this.index = this.current.index + this.index
      this.end = this.index

      this.updateTagCount('$text')
      this.updatePathFromTag('$text')

      this.data = pathToTree(this.path, this.data, result)
    }
  }

  parse() {
    const initial = this.index

    while(true) {
      if (this.index >= this.code.length) {
        break
      }

      this.parseTag()

      if (this.index >= this.code.length) {
        break
      }

      this.parseText()
    }
  }
}

module.exports = Template
