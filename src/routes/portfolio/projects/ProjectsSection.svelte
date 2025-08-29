<script lang="ts">
	import DemoCard from '$lib/components/DemoCard.svelte';
	import lilygemImg from '$lib/assets/images/LilyGem-dashboard.png?enhanced';
</script>

<div class="gallery">
	<DemoCard
		title="LilyGem"
		description="Personal finance app managing currency conversions and tracking transactions"
		tags={['Next.js', 'supabase', 'recharts', 'react-query']}
		route="/portfolio/projects/lilygem"
		github="https://github.com/bionboy/lilygem"
	>
		<div class="demo-card-image">
			<enhanced:img
				class="rounded asdf"
				alt="A personal finance application focusing on international transactions and exchange rate tracking"
				src={lilygemImg}
			/>
		</div>
	</DemoCard>
	{#each Array(2) as _}
		<DemoCard class="hidden" />
	{/each}
</div>

<style lang="postcss">
	.gallery {
		@apply grid gap-4 m-5;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	.demo-card-image {
		@apply size-full flex place-items-center overflow-clip rounded;
	}
</style>
