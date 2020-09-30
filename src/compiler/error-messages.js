const OPEN_TAG_EXPECTED = 'Sorry, I expected a tag to open here...'
const CLOSE_TAG_EXPECTED = 'Your tag is actually not closed properly'

const INVALID_TAG_NAME = 'The name of your tag contain characters that are not allowed'

const TAG_ALREADY_OPEN = 'Your tag is already open'

const ATTRIBUTE_EXPECTED = 'Sorry, I was expecting your attribute to start here...'
const INVALID_ATTRIBUTE = 'Your attribute is not valid, please check it and try again'

const ATTRIBUTE_VALUE_EXPECTED = `Wait right there, what you're doing with your attribute? It needs a value`

const EXPECTED_BINDING_END = 'Your binding is not complete, please, ensure your brackets close your binding'

const EOF = 'Okay, your tag seems to end improperly, please check it and try again'

module.exports = {
  OPEN_TAG_EXPECTED,
  CLOSE_TAG_EXPECTED,
  INVALID_TAG_NAME,
  TAG_ALREADY_OPEN,
  ATTRIBUTE_EXPECTED,
  INVALID_ATTRIBUTE,
  ATTRIBUTE_VALUE_EXPECTED,
  EXPECTED_BINDING_END,
  EOF
}
