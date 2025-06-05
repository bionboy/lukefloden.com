<script lang="ts">
	import CoverUIScrollAnimationSpotify from './CoverUIScrollAnimationSpotify.svelte';
	import * as Card from '$lib/components/ui/card';
	import { albums as albumsData, getAlbumEmbedURL, getAlbumURL, type Album } from './Album';

	// TODO: For some reason when I hard refresh the page the albums when clicked are not loading the correct embed
	const albums = albumsData.sort(() => Math.random() - 0.5);

	let album = $state(albums[0]);
	const albumEmbedUrl = $derived(getAlbumEmbedURL(album));

	const onAlbumClick = (clickedAlbum: Album) => {
		album = clickedAlbum;
	};
</script>

<div class="w-full center-container">
	<div class="w-full m-8 max-w-6xl flex flex-col gap-10 items-center">
		<div class="w-full aspect-square sm:aspect-[21/9] rounded-xl overflow-clip">
			<CoverUIScrollAnimationSpotify {albums} {onAlbumClick} />
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
