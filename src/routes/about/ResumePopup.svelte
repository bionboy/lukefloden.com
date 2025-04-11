<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import resume from '$lib/assets/documents/Resume-Luke_Floden_2-2-0.pdf';
	import Button from '$lib/components/ui/button/button.svelte';

	let { initialOpen = false } = $props();
	let open = $state(initialOpen);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button variant="outline" class="outline outline-accent-2 text-accent-2">Resume</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-7xl h-5/6">
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
			class="m-auto pt-4 pb-0 px-0 size-full"
		>
			<p>Unable to display PDF. <a href={resume}>Download instead</a></p>
		</object>
	</Dialog.Content>
</Dialog.Root>

<style lang="postcss">
</style>
