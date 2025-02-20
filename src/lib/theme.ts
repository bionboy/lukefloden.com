// Re-export everything we need from mode-watcher
export { mode, resetMode, setMode, ModeWatcher } from 'mode-watcher';

/**
 * Constants for theme modes to avoid magic strings
 * Using a const assertion to enable type inference
 */
export const ThemeMode = {
	LIGHT: 'light',
	DARK: 'dark',
	SYSTEM: 'system'
} as const;

/**
 * Type definition inferred from ThemeMode constants
 * This creates a union type of 'light' | 'dark' | 'system'
 */
export type ColorThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];
