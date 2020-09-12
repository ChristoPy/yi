/**
 * Main data observer function
 * @param {Object} data The data to be observed
 * @param {Function} callback The callback to be used for data changes
 */
module.exports = (data, callback) => {
  // Configure internal object to store the data
  // unsure it this has to be done with Object.hasOwnProperty and Object.defineProperty
  // nomarlly Proxy traps are not done this way (i guess)
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key]

      Object.defineProperty(data, key, {
        get() {
          return value
        },
        set(newValue) {
          value = newValue
          callback({ key, value })
        }
      })
    }
  }

  return new Proxy(data, {
    set: (_, name, value) => {
      data[name] = value
      return true
    }
  })
}
