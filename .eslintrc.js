module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'jest-dom'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/style-prop-object': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'import/extensions': [1, { pattern: { tsx: 'never' } }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json', 'package/*/tsconfig.json'],
      },
    },
  },
}
