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

	// Derive a single build key present in both html and pdf modules to avoid mixing builds.
	function toBuildKey(path: string) {
		return path.match(/default-\d{4}-\d{2}-\d{2}/)?.[0] ?? '';
	}

	const htmlByBuild = new Map(
		Object.entries(htmlModules).map(([k, v]) => [toBuildKey(k), v.default])
	);
	const pdfByBuild = new Map(
		Object.entries(pdfModules).map(([k, v]) => [toBuildKey(k), v.default])
	);
	const sharedKeys = [...htmlByBuild.keys()]
		.filter((k) => k && pdfByBuild.has(k))
		.sort((a, b) => b.localeCompare(a));
	const buildKey = sharedKeys[0];
	const latestHtml = buildKey ? (htmlByBuild.get(buildKey) ?? '') : '';
	const latestPdfUrl = buildKey ? (pdfByBuild.get(buildKey) ?? '') : '';
	const hasResume = latestHtml !== '' && latestPdfUrl !== '';

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

	// Focus-trap action for the dialog.
	function focusTrap(node: HTMLElement) {
		const previouslyFocused = document.activeElement as HTMLElement | null;

		// Focus the first focusable element inside the dialog.
		const focusFirst = () => {
			const focusable = node.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
			);
			focusable[0]?.focus();
		};
		focusFirst();

		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				open = false;
				return;
			}
			if (e.key !== 'Tab') return;

			const focusable = node.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
			);
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}

		node.addEventListener('keydown', handleKeydown);

		return {
			destroy() {
				node.removeEventListener('keydown', handleKeydown);
				previouslyFocused?.focus();
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

{#if open && hasResume}
	<div use:portal use:focusTrap>
		<!-- Backdrop -->
		<div
			class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
			role="presentation"
			onclick={() => (open = false)}
		></div>

		<!-- Floating resume -->
		<div
			class="fixed inset-4 z-50 md:inset-8 lg:inset-12 xl:inset-16 flex justify-center"
			role="dialog"
			aria-modal="true"
			aria-label="Resume preview"
		>
			<div class="relative size-full max-w-[8.5in]">
				<!-- <div class="relative size-full max-w-[8.5in] sm:scale-100 scale-75"> -->
				<!-- Close button -->
				<button
					class="absolute -top-3 -right-3 z-10 size-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-md"
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
						'absolute -bottom-3 -right-3 z-10 no-underline text-accent-2 outline outline-accent-2 -outline-offset-1 shadow-md'
					)}
				>
					Download PDF
				</a>

				<iframe title="Resume" srcdoc={latestHtml} sandbox="" class="size-full border-0"></iframe>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
</style>
