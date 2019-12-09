const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // less
    config,
  );

  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#2DB400" },
    javascriptEnabled: true,
  })(config, env);

  return config;
};