<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import resume from '$lib/assets/documents/Resume-Luke_Floden_3-0-1.pdf';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { open = $bindable(false) } = $props();

	const trackResumeView = (status: 'requested' | 'success' | 'fallback') => {
		console.log(`Tracking resume view: ${status}`);
		// ! Vercel Analytics are paid and I don't want to pay for it now
		// import { track } from '@vercel/analytics';
		// 	track('ResumeView', { status, resumeVersion: '2.4.0' });
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'text-accent-2 outline outline-accent-2 -outline-offset-1 '
		)}
	>
		<p class="gradient-text">Resume!</p>
	</Dialog.Trigger>
	<Dialog.Content class="h-5/6 w-5/6 max-w-7xl ">
		<object
			title="Resume"
			type="application/pdf"
			data={resume + '#view=FitH'}
			class="size-full
			  mx-auto mt-4 pb-0 px-0
				dark:invert"
			onload={() => trackResumeView('success')}
		>
			<p>
				Unable to display PDF.
				<a href={resume} onclick={() => trackResumeView('fallback')}> Download instead </a>
			</p>
		</object>
	</Dialog.Content>
</Dialog.Root>

<style lang="postcss">
</style>
