const { library } = require('./build.json');
module.exports = {
  alias: {
    '@': './src',
  },
  plugins: [
    [
      '@alifd/build-plugin-lowcode',
      {
        library,
        engineScope: "@alilc",
        extraAssets:[
          // './build/lowcode/assets-dev.json',
          './build/lowcode/assets-prod.json'
          // 'https://alifd.alicdn.com/npm/@alilc/lowcode-materials/build/lowcode/assets-prod.json'
        ]
      },
    ],
  ],
};
