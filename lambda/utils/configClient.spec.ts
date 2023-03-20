import { Project } from 'starkbank';
import { configClient } from './configClient';

describe('configClient Utils', () => {
	const privateKey = process.env.PRIVATE_PEM as string;

	it('should return a Project instance with correct attributes', () => {
		const expectedProject = {
			environment: 'sandbox',
			pem: privateKey,
			id: process.env.PROJECT_ID,
			name: 'Christofer sandbox',
			allowedIps: [],
		};

		const result = configClient(privateKey);

		expect(result).toBeInstanceOf(Project);
		expect(result).toMatchObject(expectedProject);
	});
});
