module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended','eslint:recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions:{
    project:'./tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
