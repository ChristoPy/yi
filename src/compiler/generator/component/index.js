const defaultComponentCode = `const element = require('../element')

const component = (target) => {}

module.exports = component
`

const removeDash = (value) => value.split('-').join('')

const generateDOMCode = (templateTags) => {
  const rootNode = Object.keys(templateTags)[0]

  
}

const generate = (templateTags) => {
  let finalCode = ''

  if (templateTags) {
    finalCode += generateDOMCode(templateTags)
  }
}


const templateTree = {
  "h1-0": {
    "name": "h1",
    "type": "tag",
    "attributes": {},
    "selfClosing": false,
    "tagCloser": false,
    "items": [
      {
        "$text-0": {
          "content": "Welcome ",
          "type": "text"
        }
      },
      {
        "$text-1": {
          "content": "userName",
          "type": "bind",
          "raw": "{{ userName }}"
        }
      },
      {
        "$text-2": {
          "content": "!",
          "type": "text"
        }
      }
    ]
  }
}
