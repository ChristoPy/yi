const { isSelfClosingTag } = require('../../../src/compiler/utils')

test('[UTILS] Detect a self closing tag', () => expect(isSelfClosingTag('img')).toBe(true))
test('[UTILS] Detect a non selfclosing tag', () => expect(isSelfClosingTag('a')).toBe(false))
