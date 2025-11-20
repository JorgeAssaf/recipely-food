import nextPlugin from '@next/eslint-plugin-next'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      'jsx-a11y': eslintPluginJsxA11y,
      'react-hooks': reactHooks as never,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,

      'jsx-a11y/heading-has-content': 'off',
      ...reactHooks.configs.recommended.rules,
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  ...nextTs,
  prettier,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
