import globals from 'globals';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	},
	// #region Restrict imports outside of facade modules
	{
		files: ['**/*.{js,ts,svelte}'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'mode-watcher',
							message: 'Please import from "$lib/theme" instead of mode-watcher directly.'
						}
					],
					patterns: [
						{
							group: ['mode-watcher/*'],
							message: 'Please import from "$lib/theme" instead of mode-watcher directly.'
						}
					]
				}
			]
		}
	},
	{
		files: ['src/lib/theme.ts'],
		rules: {
			'no-restricted-imports': 'off'
		}
	}
	// #endregion
);
