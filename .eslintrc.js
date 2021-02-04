module.exports = {
  'root': true,
  'env': {
    'node': true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  // error或2 开启报错  warn或1 开启警告  off或0 关闭规则(提示)
  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-html2canvas': 'off',
    'no-trailing-spaces': 1, // 一行结束后面不要有空格
    'semi': [2, 'always'], // 语句强制分号结尾
    'semi-spacing': [0, {'before': false, 'after': true}], // 分号前后空格
    'key-spacing': [0, {'beforeColon': false, 'afterColon': true }],//对象字面量中冒号的前后空格
    'indent': ['error', 2], // 代码缩进
    // "camelcase": 2, // 强制驼峰命名
    'no-mixed-spaces-and-tabs': [2, false], // 禁止混用tab和空格
    // 'spaced-comment': [2, 'always', {
    //   'markers': ['*!']
    // }] // 注释风格， 双斜杠后面空一格空格再写注释
  },
  'parserOptions': {
    'parser': 'babel-eslint'
  }
};