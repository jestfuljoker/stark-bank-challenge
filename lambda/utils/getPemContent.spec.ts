import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { getPemContent } from './getPemContent';

jest.mock('@aws-sdk/client-secrets-manager');

describe('getPemContent Utils', () => {
	const client = new SecretsManagerClient({});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return the PEM content when successful', async () => {
		const pemContent = 'ANY PEM CONTENT';
		const response = { SecretString: pemContent };

		jest
			.spyOn(client, 'send')
			.mockImplementationOnce(async () => Promise.resolve(response));

		const result = await getPemContent();

		expect(client.send).toHaveBeenCalledTimes(1);
		expect(result).toEqual(pemContent);
	});

	it('should throws an error if getPemContent does not receive SecretString value or client throws an exception', async () => {
		const response = {};

		jest
			.spyOn(client, 'send')
			.mockImplementationOnce(async () => Promise.resolve(response));

		expect(getPemContent()).rejects.toThrow('An internal error occurred');
	});
});
