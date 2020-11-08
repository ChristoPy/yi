const { isWhiteSpace } = require('../../../src/compiler/utils')

test('[UTILS] Detect white space characters', () => {
  expect(isWhiteSpace(' ')).toBe(true);
  expect(isWhiteSpace('\n')).toBe(true);
  expect(isWhiteSpace('\t')).toBe(true);
})
test('[UTILS] Detect a non white space character', () => expect(isWhiteSpace('a')).toBe(false))
