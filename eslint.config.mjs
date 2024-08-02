import tsParser from '@typescript-eslint/parser'

export default [
	{
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2023,
			sourceType: 'module',
		},
	},
]
