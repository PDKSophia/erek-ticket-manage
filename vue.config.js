const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 2345,
    host: 'localhost',
    proxy: {
      '/chain': {
        target: 'https://sm.ms/api/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/chain': ''
        }
      }
    }
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
