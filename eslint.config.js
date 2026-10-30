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
		linterOptions: {
			reportUnusedDisableDirectives: 'error'
		}
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],

		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', '.vercel/', 'src/lib/resume-system/']
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					reportUsedIgnorePattern: true
				}
			]
		}
	},
	{
		files: ['**/*.ts', '**/*.svelte'],
		rules: {
			'no-undef': 'off',
			'svelte/no-navigation-without-resolve': 'off'
		}
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
							message: 'Please import from "#lib/theme" instead of mode-watcher directly.'
						}
					],
					patterns: [
						{
							group: ['mode-watcher/*'],
							message: 'Please import from "#lib/theme" instead of mode-watcher directly.'
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
