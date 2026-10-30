<script lang="ts">
	import CoverUIScrollAnimation from './CoverUIScrollAnimation.svelte';
	import * as Card from '#lib/components/ui/card/index.js';
	import { getAlbumEmbedURL, type Album } from './Album';
	import { browser } from '$app/env';
	import { AlertTriangle } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// The server load shuffles once per request. Using that payload on the client
	// keeps the covers and the embed on the same order through hydration.
	let selectedId = $state<string | null>(null);
	const album = $derived.by(() => {
		const selected = data.albums.find((item) => item.id === selectedId) ?? data.albums[0];
		if (!selected) {
			throw new Error('Cover flow has no albums');
		}
		return selected;
	});
	const albumEmbedUrl = $derived(getAlbumEmbedURL(album));

	// TODO: turn this into a component or server action or hook or something
	// Feature detection for Scroll-Linked Animations
	let supportsScrollTimeline = $state(false);
	if (browser) {
		supportsScrollTimeline =
			CSS.supports('animation-timeline: --x') ||
			CSS.supports('view-timeline-name: --x') ||
			CSS.supports('scroll-timeline-name: --x');
	}

	const onAlbumClick = (clickedAlbum: Album) => {
		selectedId = clickedAlbum.id;
	};
</script>

<div class="w-full center-container">
	<div class="w-full m-8 max-w-6xl flex flex-col gap-10 items-center">
		{#if browser && !supportsScrollTimeline}
			{@render browserCompatibilityNotice()}
		{/if}
		<div class="w-full aspect-square sm:aspect-[21/9] overflow-clip">
			<CoverUIScrollAnimation albums={data.albums} {onAlbumClick} />
		</div>
		<!-- ! has to be h-9.5rem because on dark mode you will see white in the background overflow -->
		<iframe
			title={`Spotify album embed for ${album.name}`}
			src={albumEmbedUrl}
			frameBorder="0"
			class="w-full max-w-2xl h-[9.5rem] rounded"
			allowfullscreen={true}
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
			loading="lazy"
		>
		</iframe>
	</div>
</div>
<!-- <div class="max-w-xl mx-auto -mt-10">
	<Card.Root>
		<Card.Content>
			<ul>
				{#each albums as album}
					<li>
						<a href={getAlbumURL(album)}>{album.name}</a>
					</li>
				{/each}
			</ul>
		</Card.Content>
	</Card.Root>
</div> -->

{#snippet browserCompatibilityNotice()}
	<Card.Root class="w-full max-w-2xl border-yellow-500/50 bg-yellow-5000 bg-background/50">
		<Card.Header>
			<Card.Title class="flex gap-2 text-yellow-600 dark:text-yellow-400">
				<AlertTriangle size={20} />
				Browser Compatibility Notice
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<p class="text-sm text-muted-foreground">
				This demo uses advanced CSS features that work best in Chromium-based browsers. For the
				optimal experience, please view this demo in Chrome, Edge, Brave, or another Chromium-based
				browser.
			</p>
		</Card.Content>
	</Card.Root>
{/snippet}
