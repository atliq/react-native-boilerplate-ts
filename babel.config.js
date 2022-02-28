var fs = require('fs');

module.exports = api => {
  api.cache(true);
  let modules = JSON.parse(fs.readFileSync('./modules.json', 'utf8')).modules;
  const getDeeper = fPath => {
    const path = fPath.split('/');
    return { parent: path[0], target: path[1] };
  };

  const checkDeep = fPath => {
    if (fPath.indexOf('/') !== -1) {
      let { parent, target } = getDeeper(fPath);
      let path = `${parent}/${target}`;
      return { path, target };
    }
    return { path: fPath, target: fPath };
  };

  const alias = modules.reduce(
    (aliasAcc, moduleName) => {
      const { path, target } = checkDeep(moduleName);
      aliasAcc[`@${target}`] = `./App/${path}`;
      return aliasAcc;
    },
    {
      // explicitly add redux to avoid conflict with local redux folder's package.json
      redux: './node_modules/redux',
    },
  );

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias,
        },
      ],
    ],
  };
};
