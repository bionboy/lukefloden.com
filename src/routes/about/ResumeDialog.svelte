<script lang="ts">
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

	// Portal action — moves the node to document.body so fixed positioning
	// escapes any ancestor stacking contexts (e.g. backdrop-filter on cards).
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}
</script>

<button
	class={cn(
		buttonVariants({ variant: 'outline' }),
		'text-accent-2 outline outline-accent-2 -outline-offset-1'
	)}
	onclick={() => (open = true)}
>
	<p class="gradient-text">Resume!</p>
</button>

{#if open}
	<div use:portal>
		<!-- Backdrop -->
		<div
			class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
			role="presentation"
			onclick={() => (open = false)}
		></div>

		<!-- Floating resume -->
		<div class="fixed inset-4 z-50 md:inset-8 lg:inset-12 xl:inset-16 pointer-events-none">
			<!-- Close button -->
			<button
				class="pointer-events-auto absolute -top-3 -right-3 z-10 size-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-md"
				onclick={() => (open = false)}
				aria-label="Close resume"
			>
				✕
			</button>

			<!-- Download button -->
			<a
				href={latestPdfUrl}
				download="Resume-Luke-Floden.pdf"
				class={cn(
					buttonVariants({ variant: 'outline' }),
					'pointer-events-auto absolute -bottom-3 right-6 z-10 no-underline text-accent-2 outline outline-accent-2 -outline-offset-1 shadow-md'
				)}
			>
				Download PDF
			</a>

			<iframe
				title="Resume"
				srcdoc={latestHtml}
				class="pointer-events-auto size-full rounded-lg shadow-2xl border-0"
			></iframe>
		</div>
	</div>
{/if}

<style lang="postcss">
</style>
