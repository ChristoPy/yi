const component = require('../../../src/runtime')

component({
  dom: '#app',
  data: {
    testName: 'lifecycle',
    libraryName: 'yi'
  },
  template: '<h1>Testing {{ testName }}!</h1><p>After 3 seconds {{libraryName}} will update!</p>',
  created() {
    console.log('[CREATED] Component was created')
    console.log('Data is: ', JSON.stringify(this.data))
    console.log('===============================')
  },
  mounted() {
    console.log('[MOUNTED] Component was mounted')
    console.log('Data is: ', JSON.stringify(this.data))
    console.log('===============================')

    setTimeout(() => this.data.testName = 'nothing', 3000)
  },
  updated() {
    console.log('[UPDATED] Component was updated')
    console.log('Data now is: ', JSON.stringify(this.data))
    console.log('===============================')
  }
})
