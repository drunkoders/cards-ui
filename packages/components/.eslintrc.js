module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  rules: {
    'react/prop-types': 0,
    'prettier/prettier': 'error',
    'max-lines': ['error', 100],
    'eol-last': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['warn', { "argsIgnorePattern": "^_" }]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
};
