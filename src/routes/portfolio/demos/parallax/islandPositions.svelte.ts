export function createPositions(width: number, height: number, amount: number) {
	// const overscanFactor = 0.5;
	const overscanFactor = 1;
	// const overscanFactor = 1.2;
	// const overscanFactor = 1.5;
	const result: number[][] = [];
	for (let j = 0; j < amount; j++) {
		result[j] = [
			width / 2 + (Math.random() - 0.5) * (width * overscanFactor),
			height / 2 + (Math.random() - 0.5) * (height * overscanFactor)
		];
	}

	return result;
}
