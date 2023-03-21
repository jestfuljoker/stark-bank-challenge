import { faker } from '@faker-js/faker';
import { getRandomNumber } from './getRandomNumber';

describe('getRandomNumber utils function', () => {
	it('should generate a random number between min and max', () => {
		const min = faker.datatype.number();
		const max = faker.datatype.number({ min });
		const randomNumber = getRandomNumber(min, max);

		expect(randomNumber).toBeGreaterThanOrEqual(min);
		expect(randomNumber).toBeLessThanOrEqual(max);
	});

	it('should generate different random numbers on multiple runs', () => {
		const min = faker.datatype.number();
		const max = faker.datatype.number({ min });
		const randomNumber1 = getRandomNumber(min, max);
		const randomNumber2 = getRandomNumber(min, max);

		expect(randomNumber1).not.toBe(randomNumber2);
	});
});
