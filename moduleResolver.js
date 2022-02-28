var fs = require('fs');

var { modules, root, base } = JSON.parse(
  fs.readFileSync('./modules.json', 'utf8'),
);
let tsConf = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf8'));
tsConf.compilerOptions.baseUrl = root;
const extraPaths = {
  '*': [`${root}/${base}/*`],
  redux: ['./node_modules/redux'],
};

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
let paths = { ...extraPaths };
modules.forEach(module => {
  const { path, target } = checkDeep(module);
  paths[`@${target}/*`] = [`${root}/${base}/${path}/*`];
});
tsConf.compilerOptions.paths = paths;

fs.writeFileSync('./tsconfig.json', JSON.stringify(tsConf, null, 2));
