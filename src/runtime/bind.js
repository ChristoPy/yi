/**
 * Main data observer function
 * @param {Object} data The data to be observed
 * @param {Function} callback The callback to be used for data changes
 */
module.exports = (data, callback) => {
  // Configure internal object to store the data
  // unsure it this has to be done with Object.hasOwnProperty and Object.defineProperty
  // nomarlly Proxy traps are not done this way (i guess)
  return new Proxy(data, {
    get: (_, path) => {
      return data[path]
    },
    set: (_, path, value) => {
      data[path] = value
      callback()
      return true
    }
  })
}
