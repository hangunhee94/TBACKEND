module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'unused-imports', 'sort-imports-es6-autofix', 'prettier'],
  extends: [
    // NestJS default extends
    'plugin:@typescript-eslint/recommended',

    // Import recommended
    'plugin:import/recommended',

    // Support TypeScript [Import]
    'plugin:import/typescript',

    // Support JavaScript [Airbnb]
    'airbnb-base',

    // Support TypeScript [Airbnb]
    'airbnb-typescript/base',

    // IMPORTANT: add this to the last of the extends to override ESLint rules
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // NestJS default rules
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // ban-types
    '@typescript-eslint/ban-types': 'warn',

    // Conflict with unused-imports plugin
    '@typescript-eslint/no-unused-vars': 'off',

    // Variables / Types naming rules
    '@typescript-eslint/naming-convention': [
      'error',

      // Enforce that all variables, functions and properties follow are camelCase or PascalCase
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        filter: {
          regex: '^npm_',
          match: false,
        },
      },

      // Allow that const variables can be camelCase or UPPER_CASE or PascalCase
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        filter: {
          regex: '^npm_',
          match: false,
        },
      },

      // Enforce that class follow are PascalCase
      { selector: 'class', format: ['PascalCase'] },
    ],

    // Conflict with sort-imports-es6 plugin
    'import/order': 'off',

    // Example setting of sort-imports-es6 plugin
    'sort-imports-es6-autofix/sort-imports-es6': [
      'warn',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    // For Typescript, it is better not to use default export: https://stackoverflow.com/a/33307487/11440474
    'import/prefer-default-export': 'off',

    // Conflict with alias path
    'import/extensions': 'off',

    // Not enforce using 'this' in a class function since some function can be a pure function
    'class-methods-use-this': 'off',

    // "{DEPENDENCY} should be listed in the project's dependencies." Solution
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
  },
};
