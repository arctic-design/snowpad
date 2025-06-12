// const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
// const { fixupConfigRules } = require('@eslint/compat');
const nx = require('@nx/eslint-plugin');
const typescriptEslint = require('typescript-eslint');

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
// });

module.exports = [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,

  {
    ignores: ['**/dist', '.next/**/*'],
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@nx': nx,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
