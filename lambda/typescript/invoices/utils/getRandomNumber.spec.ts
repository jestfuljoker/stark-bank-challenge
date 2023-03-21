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
});
