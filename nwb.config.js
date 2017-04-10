module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'BisuReactRowSearch',
      externals: {
        react: 'React'
      }
    }
  }
}
