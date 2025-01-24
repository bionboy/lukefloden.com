<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let props = $props();
</script>

<Card.Root class="bg-secondary">
	<Card.Header>
		<Card.Title>
			<h2>{props.title}</h2>
		</Card.Title>
	</Card.Header>
	<Card.Content>
		{@render props.children?.()}
	</Card.Content>
</Card.Root>
