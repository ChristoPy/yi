const { isTagCloser } = require('../../../src/compiler/utils')

test('[UTILS] Detect "/" as a tag closer', () => expect(isTagCloser('/')).toBe(true))
test('[UTILS] Detect ">" as a tag closer', () => expect(isTagCloser('>')).toBe(true))
test('[UTILS] Detect the input is not a tag closer', () => expect(isTagCloser('a')).toBe(false))
