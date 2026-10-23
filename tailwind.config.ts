import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const v3SansFontFamily = [
	'ui-sans-serif',
	'system-ui',
	'sans-serif',
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"',
	'"Segoe UI Symbol"',
	'"Noto Color Emoji"'
];

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
					2: 'hsl(var(--accent2) / <alpha-value>)',
					light: 'hsl(var(--accent-light) / <alpha-value>)',
					dark: 'hsl(var(--accent-dark) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},
				yellow: {
					400: '#facc15',
					500: '#eab308',
					600: '#ca8a04'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: v3SansFontFamily,
				jersey15: ['Jersey\\ 15'],
				shhh: ['shhh', ...v3SansFontFamily]
			},
			dropShadow: {
				glow: ['0 0 5px', '0 0 10px', '0 0 20px'],
				xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)']
			},
			fontSize: {
				xs: ['0.75rem', { lineHeight: '1rem' }],
				sm: ['0.875rem', { lineHeight: '1.25rem' }],
				base: ['1rem', { lineHeight: '1.5rem' }],
				lg: ['1.125rem', { lineHeight: '1.75rem' }],
				xl: ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }]
			},
			boxShadow: {
				sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
			},
			backdropBlur: {
				sm: '4px'
			}
		}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.center-container': {
					display: 'flex',
					'justify-content': 'center',
					'align-items': 'center'
				},
				'.debug': {
					'outline-color': 'red !important',
					'outline-style': 'dashed !important',
					'outline-width': '1px !important',
					'outline-offset': '1px !important',
					'background-color': 'rgba(255, 0, 0, 0.25) !important'
				},
				'.debug-2': {
					'outline-color': 'green !important',
					'outline-style': 'dashed !important',
					'outline-width': '1px !important',
					'outline-offset': '1px !important',
					'background-color': 'rgba(0, 255, 0, 0.25) !important'
				},
				'.debug-3': {
					'outline-color': 'blue !important',
					'outline-style': 'dashed !important',
					'outline-width': '1px !important',
					'outline-offset': '1px !important',
					'background-color': 'rgba(0, 0, 255, 0.25) !important'
				}
			});
		})
	]
};

export default config;
