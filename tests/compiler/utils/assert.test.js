const { assert } = require('../../../src/compiler/utils')
const { EOF } = require('../../../src/compiler/error-messages')

test(
  '[UTILS] Throw error with a falsy input',
  () => expect(() => assert(false, '')).toThrow()
)

test(
  '[UTILS] Throw EOF error with a falsy input',
  () => expect(() => assert(false, 'EOF')).toThrow(EOF)
)

test(
  '[UTILS] Throw not error with a truthy input',
  () => expect(() => assert(true, 'EOF')).not.toThrow()
)
