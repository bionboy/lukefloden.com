<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import resume from '$lib/assets/documents/Resume-Luke_Floden_2-3-0.pdf';
	import Button from '$lib/components/ui/button/button.svelte';

	let { open = $bindable(false) } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button
			variant="outline"
			class="text-accent-2
		    outline outline-accent-2 -outline-offset-1
				"
		>
			<p class="gradient-text">Resume!</p>
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="h-5/6 w-5/6 max-w-7xl ">
		<!-- <Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header> -->
		<object
			title="Resume"
			type="application/pdf"
			data={resume + '#view=FitH'}
			class="size-full
			  mx-auto mt-4 pb-0 px-0
				dark:invert"
		>
			<p>Unable to display PDF. <a href={resume}>Download instead</a></p>
		</object>
	</Dialog.Content>
</Dialog.Root>

<style lang="postcss">
</style>
