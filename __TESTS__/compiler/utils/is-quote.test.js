const { isQuote } = require('../../../src/compiler/utils')

test('[UTILS] Detect double quote', () => expect(isQuote('"')).toBe(true))
test('[UTILS] Detect single quote', () => expect(isQuote("'")).toBe(true))
test('[UTILS] Detect the input is not a quote', () => expect(isQuote(0)).toBe(false))
