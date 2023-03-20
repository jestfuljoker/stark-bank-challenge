import { Project } from 'starkbank';
import { configClient } from './configClient';

let privateKey: string;

type ReturnedProject = {
	allowedIps: [];
	environment: string;
	name: string;
	id: string;
	pem: string;
};

function makeExpectedProject(): ReturnedProject {
	return {
		allowedIps: [],
		pem: privateKey,
		environment: 'sandbox',
		name: 'Christofer sandbox',
		id: process.env.PROJECT_ID as string,
	};
}

describe('configClient Utils', () => {
	beforeEach(() => {
		privateKey = process.env.PRIVATE_PEM as string;
	});

	it('should return a Project instance with correct attributes', () => {
		const expectedProject = makeExpectedProject();

		const result = configClient(privateKey);

		expect(result).toBeInstanceOf(Project);
		expect(result).toMatchObject(expectedProject);
	});

	it('should throws an Exception if environment is invalid', () => {
		try {
			configClient(privateKey, '');
		} catch (error) {
			expect(error).toStrictEqual(
				new Error(
					'Invalid environment, please choose among production,sandbox',
				),
			);
		}
	});
});
