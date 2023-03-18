export function getRandomNumber(min: number, max: number): number {
	return Math.ceil(Math.floor(Math.random() * (max - min + 1)) + min);
}
