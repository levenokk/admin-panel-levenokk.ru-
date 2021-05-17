module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  ignorePatterns: [".eslintrc.js", 'node_modules/**/*','build/**/*', 'public/**/*'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    "eslint:recommended",
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["simple-import-sort", "import"],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    "import/no-unresolved": "off",
    "import/named": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
}