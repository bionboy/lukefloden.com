<!--
  TODO:
- https://github.com/bionboy/my-site/issues/16
  - [ ] Make covers flip and scale up towards user when clicked
    - with info about them
    - or like the back of the cover
    - or let the user rotate them with a 3d transform
      - like an inspect mode in a game
- https://github.com/bionboy/my-site/issues/15
  - [ ] style the scrollbar
  - [ ] add in new carousel browser features for
    - [ ] scroll bar
    - [ ] scroll markers
    - [ ] prev/next buttons
    - [ ] etc.
-->

<script lang="ts">
	// TODO: replace with my own images
	const coverImages = [
		'https://assets.codepen.io/89905/coverflow--Front-1024x1024.jpg',
		'https://assets.codepen.io/89905/coverflow--A-Thousand-Clouds-Front-Cover-1024x1024.jpg',
		'https://assets.codepen.io/89905/coverflow--Odd-World-EP-SMALL-1024x1024.png',
		'https://assets.codepen.io/89905/coverflow--Forest-Blue-Pre-LR-1024x1024.png',
		'https://assets.codepen.io/89905/coverflow--MOM-Remixes-1024x1024.jpg',
		'https://assets.codepen.io/89905/coverflow--ALONE-TOGETHER-remix-V71-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Nature-Therapy-Pre-LR-550x550.png',
		'https://assets.codepen.io/89905/coverflow--Deep-Dive-Ambient-Edits-V8-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Alpine-Koresma-x-Aroth-Artwork-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Out-Of-the-Dark-Cover-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--2020-06-07-Marley-Carroll-Single-Blue-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Deep-Dive-EP-Cover-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Blackrose-Cover-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--FW-Imagine-Gold-Remixes2-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--We-Are-COVER-MAIN-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Bath-House-Flat-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Pronoia-JPG-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Lapa9Theory-Cracking-Stores-no-Loci-logo-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--EMANCIPATOR_MOM_AlbumCover-2000px-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--MURGE-ep-cvr-3000x3000-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--Emancipator_Laybrinth-ART-01-4000x4000-at-300dpi-550x550.jpg',
		'https://assets.codepen.io/89905/coverflow--cover-550x550.jpg'
	];
</script>

<!-- <div class="cards-wrapper" style:--cover-size={coverSize}> -->
<div class="cards-wrapper">
	<ul class="cards">
		{#each coverImages as coverImage}
			<li>
				<img src={coverImage} width="1200" height="1200" alt="…" />
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.cards-wrapper {
		/* container-type: inline-size; */
		container-type: size;
		container-name: cards;

		/* make album covers 1/3 of the container height */
		--cover-size: 33cqb;

		@apply flex
      justify-center
      items-center
      size-full
      bg-background/60
      border-muted border-[1px];

		overflow-x: scroll;
		scroll-snap-type: x mandatory;

		perspective: 40em;

		.cards {
			list-style: none;
			white-space: nowrap;
			@apply w-0 m-0 p-0;

			li {
				@apply p-0 m-0;
				/* margin between li should be inversely proportional to the screen width */
				/* margin-inline: clamp(0.5rem, calc(2rem - 2cqi), 1rem); */
				margin-inline: 0.5rem;

				display: inline-block;
				width: var(--cover-size);
				aspect-ratio: 1;

				scroll-snap-align: center;

				/* Track this element as it intersects the scrollport */
				view-timeline-name: --li-in-and-out-of-view;
				view-timeline-axis: inline;

				/* Link an animation to the established view-timeline and have it run during the contain phase */
				animation: linear adjust-z-index both;
				animation-timeine: --li-in-and-out-of-view;

				/* Adjust end of list so scroll can 'go past' last element (not needed for start because of flex + centering) */
				&:last-of-type {
					margin-inline-end: 50cqi;
				}

				img {
					width: 100%;
					height: auto;

					/* Link an animation to the established view-timeline (of the parent li) and have it run during the contain phase */
					animation: linear rotate-cover both;
					animation-timeline: --li-in-and-out-of-view;

					/* Reflect the image below the element    */
					-webkit-box-reflect: below 0.5em linear-gradient(rgb(0 0 0 / 0), rgb(0 0 0 / 0.25));

					/* TODO: do I need these and why were they there to being with? */
					/* will-change: transform; */
					/* user-select: none; */
					/* Prevent FOUC with polfyill */
					/* transform: translateX(-100%) rotateY(-45deg); */
				}
			}
		}
	}

	.cards,
	.cards li,
	.cards li img {
		transform-style: preserve-3d;
	}

	/* TODO: I don't think this is even doing anything */
	/* The keyframes for the li elements make it so that at halfway in the scroller, that cover is topmost. */
	@keyframes adjust-z-index {
		0% {
			z-index: 1;
		}
		50% {
			z-index: 10; /* When at the center, be on top */
		}
		100% {
			z-index: 1;
		}
	}

	/* The keyframes for the img work in similar fashion. At the 50% mark, the cover faces forwards. On the other sides, it is rotated sideways. */
	@keyframes rotate-cover {
		0% {
			transform: translateX(-100%) rotateY(-45deg);
		}
		35% {
			transform: translateX(0) rotateY(-45deg);
		}
		50% {
			transform: rotateY(0deg) translateZ(1em) scale(1.5);
		}
		65% {
			transform: translateX(0) rotateY(45deg);
		}
		100% {
			transform: translateX(100%) rotateY(45deg);
		}
	}
</style>
