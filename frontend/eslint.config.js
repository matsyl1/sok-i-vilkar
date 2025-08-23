import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', 'vite.config.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      stylistic
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
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
    },
  },
])
