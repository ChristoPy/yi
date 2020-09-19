const MUSTACHE_REGEX = /{{\s*\w*\s*}}/g

/**
 * Template compiler function
 * @param {String} template The template
 * @param {Object} data Data to bind with the template
 */
module.exports = (template, data) => {
  [...template.matchAll(MUSTACHE_REGEX)]
  .forEach(match => {
    // dont know what it does but seems to work
    const normalizedKey = match[0].substr(2, match[0].length - 4).trim()
    template = template.replace(match[0], data[normalizedKey])
  })
  return template
}
