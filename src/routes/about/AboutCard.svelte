<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let props = $props();
</script>

<Card.Root class="bg-secondary">
	<!-- <Card.Header class="flex flex-row justify-start"> -->
	<Card.Header>
		<Card.Title tag="h2">
			<h2>
				{props.title}
			</h2>
		</Card.Title>

		{#if props.description}
			<Card.Description>
				<h4>
					{props.description}
				</h4>
			</Card.Description>
		{/if}
	</Card.Header>
	<Card.Content>
		{@render props.children?.()}
	</Card.Content>
</Card.Root>
