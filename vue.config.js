const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 2345,
    host: 'localhost'
  },
  baseUrl: './',
  configureWebpack: {
    resolve: {
      alias: {
        js: path.resolve(__dirname, 'src/js/'),
        components: path.resolve(__dirname, 'src/components/'),
        service: path.resolve(__dirname, 'src/service/'),
        tkcomponents: path.resolve(__dirname, 'src/TicketComponents/'),
        store: path.resolve(__dirname, 'src/store/')
      }
    }
  }
}
