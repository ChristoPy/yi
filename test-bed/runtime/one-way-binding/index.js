const component = require('../../../src/runtime')

component({
  dom: '#app',
  data: {
    userName: 'Chris',
    libraryName: 'yi'
  },
  template: '<h1>Hello, {{ userName }}!</h1><p>{{libraryName}} is awesome!</p>',
})
