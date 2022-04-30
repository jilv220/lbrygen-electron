// For electron-vue app, config "build" here instead

module.exports = {
  transpileDependencies: true,
  configureWebpack:{
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  },
  // plugin
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraResources: [
          "static"
        ]
      },
      chainWebpackMainProcess: (config) => {
        config.output.filename('background.js')
      }
    }
  }
}

