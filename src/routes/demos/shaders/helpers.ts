export function getNormalizedMouseCoords(event: MouseEvent): [number, number] {
	const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
	const x = (event.clientX - rect.left) / rect.width;
	const y = (event.clientY - rect.top) / rect.height;
	// shader expects origin to be bottom left not top left, hence 1 - y
	return [x, 1 - y];
}
