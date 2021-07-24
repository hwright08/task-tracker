module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 'off',
    'space-before-function-paren': 'off',
    'prefer-const': 'off',
    'no-unused-vars': 'off',
    'key-spacing': 'off',
    'comma-dangle': 'off',
    'no-multi-spaces': 'off',
    'indent': 'off',
    'vue/valid-v-slot': 'off'
  }
}
