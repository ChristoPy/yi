const { isIdentifier} = require('../../../src/compiler/utils')

test('[UTILS] Detect basic identifier', () => expect(isIdentifier('p')).toBe(true))
test('[UTILS] Detect identifier followed by a number', () => expect(isIdentifier('h1')).toBe(true))
test('[UTILS] Detect dashed identifier', () => expect(isIdentifier('my-component')).toBe(true))
test('[UTILS] Detect non identifier', () => expect(isIdentifier('img!')).toBe(false))
