<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let props = $props();
</script>

<Card.Root class="bg-secondary">
	<Card.Header>
		<Card.Title tag="h2">
			{props.title}
		</Card.Title>
		{#if props.subtitle}
			<h4>{props.subtitle}</h4>
		{/if}
	</Card.Header>
	<Card.Content>
		{@render props.children?.()}
	</Card.Content>
</Card.Root>
