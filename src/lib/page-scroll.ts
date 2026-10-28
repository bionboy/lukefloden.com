import { createContext } from 'svelte';

type PageScroll = {
	readonly x: number;
	readonly y: number;
	scrollTo: (options: ScrollToOptions) => void;
};

export const [getPageScroll, setPageScroll] = createContext<PageScroll>();
