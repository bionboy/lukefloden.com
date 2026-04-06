<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { open = $bindable(false) } = $props();

	// Eagerly import all default resume outputs from the submodule at build time.
	// Sorting by path is safe because the date is embedded in the folder name (default-YYYY-MM-DD).
	const htmlModules = import.meta.glob('/src/lib/resume-system/outputs/default-*/resume/*.html', {
		query: '?raw',
		eager: true
	}) as Record<string, { default: string }>;

	const pdfModules = import.meta.glob('/src/lib/resume-system/outputs/default-*/resume/*.pdf', {
		query: '?url',
		eager: true
	}) as Record<string, { default: string }>;

	const latestHtml =
		Object.entries(htmlModules).sort(([a], [b]) => b.localeCompare(a))[0]?.[1]?.default ?? '';
	const latestPdfUrl =
		Object.entries(pdfModules).sort(([a], [b]) => b.localeCompare(a))[0]?.[1]?.default ?? '';

	const trackResumeView = (status: 'requested' | 'success' | 'fallback') => {
		console.log(`Tracking resume view: ${status}`);
		// ! Vercel Analytics are paid and I don't want to pay for it now
		// import { track } from '@vercel/analytics';
		// 	track('ResumeView', { status, resumeVersion: 'latest' });
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'text-accent-2 outline outline-accent-2 -outline-offset-1'
		)}
		onclick={() => trackResumeView('requested')}
	>
		<p class="gradient-text">Resume!</p>
	</Dialog.Trigger>
	<Dialog.Content class="h-5/6 w-5/6 max-w-7xl flex flex-col gap-2">
		<div class="flex justify-end">
			<a
				href={latestPdfUrl}
				download="Resume-Luke-Floden.pdf"
				class={cn(buttonVariants({ variant: 'outline' }), 'text-accent-2 no-underline')}
				onclick={() => trackResumeView('fallback')}
			>
				Download PDF
			</a>
		</div>
		<iframe title="Resume" srcdoc={latestHtml} class="size-full border-0 rounded-sm"></iframe>
	</Dialog.Content>
</Dialog.Root>

<style lang="postcss">
</style>
