const { assert } = require('../../utils')
const { OPEN_TAG_EXPECTED, UNEXPECTED_TAG_OPEN } = require('../../error-messages')
const { modifyLast } = require('../utils')
const Text = require('../text')
const Tag = require('../tag')

class Template {
  constructor(code) {
    this.code = code
    this.index = 0

    this.start = 0
    this.end = 0

    this.templateStarted = 0

    this.currentParser = null
    this.lastNode = null

    this.nodes = {}
    this.nodesCount = {}

    this.path = ''
    this.tree = {}

    this.data = {}
  }

  next() {
    assert(this.index < this.code.length, 'EOF')
    return this.code[this.index++]
  }

  updateNodesCount(nodeName) {
    if (this.nodesCount[nodeName] === undefined) {
      this.nodesCount[nodeName] = 0
    } else {
      this.nodesCount[nodeName] += 1
    }
  }

  getNodesCount(node) {
    if (node.tagCloser || node.selfClosing || node.type === 'text') {
      return this.nodesCount[node.name] || 0
    }
    this.updateNodesCount(node.name)
    return this.nodesCount[node.name]
  }

  parseTag() {
    const codeToParse = this.code.substring(this.index, this.code.length)
    this.currentParser = new Tag(codeToParse, 0)
    let resultingNode

    try {
      resultingNode = this.currentParser.parse()
    } catch (error) {
      if (error !== OPEN_TAG_EXPECTED) {
        throw error
      }
    }

    if (resultingNode) {
      this.index = this.currentParser.index + this.index
      this.end = this.index

      const amountOfSameNodes = this.getNodesCount(resultingNode)
      const nodeName = `${resultingNode.name}-${amountOfSameNodes}`
      this.nodes[nodeName] = resultingNode

      if (!resultingNode.tagCloser) {
        if (!this.path.length) {
          this.path += nodeName
        } else {
          let splittedPath = this.path.split('.')
          splittedPath = [...splittedPath, nodeName]

          this.path = splittedPath.join('.')
        }

        if (!this.lastNode) {
          this.tree[nodeName] = {}
        } else {
          this.tree = modifyLast(this.tree, this.path, resultingNode)
        }

        if (!resultingNode.selfClosing || resultingNode.type !== 'text') {
          this.lastNode = nodeName
        }
      } else {
        let splittedPath = this.path.split('.')

        this.path = splittedPath.slice(0, splittedPath.length - 1).join('.')
      }
    }
  }

  parseText() {
    const codeToParse = this.code.substring(this.index, this.code.length)
    this.currentParser = new Text(codeToParse, 0)

    try {
      this.currentParser.parse()
    } catch (error) {
      if (error !== UNEXPECTED_TAG_OPEN) {
        throw error
      }
    }

    const resultingData = this.currentParser.data

    if (resultingData.length) {
      this.index = this.currentParser.index + this.index
      this.end = this.index

      resultingData.forEach((text) => {
        const amountOfSameNodes = this.getNodesCount({ name: 'text' })
        const nodeName = `text-${amountOfSameNodes}`
        this.nodes[nodeName] = text
  
        const lastNode = this.nodes[this.lastNode]
        if (!this.lastNode || !this.path.length) {
          this.path += nodeName
        } else if (!lastNode.tagCloser || !lastNode.selfClosing) {
          this.path += `.${nodeName}`
        }

        const splittedPath = this.path.split('.')
  
        this.tree = modifyLast(this.tree, this.path, nodeName)
        this.path = splittedPath.slice(0, splittedPath.length - 1).join('.')
      })
    }
  }

  parse() {
    const initial = this.index

    while (true) {
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
