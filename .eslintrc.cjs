/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@typescript-eslint', 'tailwindcss/recommended'],
  extends: [
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'next/core-web-vitals',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: {
    tailwindcss: {
      callees: ['cn'],
      config: './tailwind.config.ts',
    },
    next: {
      rootDir: ['./'],
    },
  },
}

module.exports = config
