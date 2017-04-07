module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'BisuRowSearch',
      externals: {
        react: 'React'
      }
    }
  }
}
