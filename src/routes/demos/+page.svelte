<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/demos/internal');
	});
</script>

<div class="center-container h-[80vh]">
	<p>Redirecting to internal demos...</p>
</div>
