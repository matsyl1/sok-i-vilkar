import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['src/**/*.{js,ts}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    plugins: {
      stylistic,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    rules: {
      'stylistic/semi': ['error', 'always'],
      'stylistic/indent': ['error', 2],
      'stylistic/no-trailing-spaces': ['error'],
      'stylistic/array-bracket-spacing': ['error', 'never'],
      'stylistic/object-curly-spacing': ['error', 'always'],
      'stylistic/eol-last': ['error', 'always'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/type-annotation-spacing': ['error'],
      'stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false },
      }],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
      'stylistic/function-call-spacing': ['error', 'never'],
      'curly': ['error', 'all'],
      'prefer-const': ['error'],
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);