import { randInt } from './helpers';

describe('randInt', () => {
	const randomFn = Math.random;

	afterEach(() => {
		Math.random = randomFn;
	});

	it('should return min when Math.random returns 0', () => {
		Math.random = (): number => 0;
		const actual = randInt(5, 17);
		expect(actual).toEqual(5);
	});

	it('should return min when Math.random returns nearly 0', () => {
		Math.random = (): number => 0.01;
		const actual = randInt(5, 17);
		expect(actual).toEqual(5);
	});

	it('should return max when Math.random returns nearly 1', () => {
		Math.random = (): number => 0.99;
		const actual = randInt(5, 17);
		expect(actual).toEqual(17);
	});
});
