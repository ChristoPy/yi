const { isIdentifier} = require('../../../src/compiler/utils')

test('[UTILS] Detect identifier without dashes', () => expect(isIdentifier('p')).toBe(true))
test('[UTILS] Detect dashed identifier', () => expect(isIdentifier('my-component')).toBe(true))
test('[UTILS] Detect non identifier', () => expect(isIdentifier('img!')).toBe(false))
