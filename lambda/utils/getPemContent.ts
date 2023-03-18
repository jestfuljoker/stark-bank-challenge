import {
	SecretsManagerClient,
	GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({
	region: process.env.REGION,
});

export async function getPemContent(): Promise<string> {
	try {
		const command = new GetSecretValueCommand({
			SecretId: 'stark-bank-private-key',
			VersionStage: 'AWSCURRENT',
		});

		const response = await client.send(command);

		if (!response.SecretString) {
			throw new Error('An internal error occurred');
		}

		return response.SecretString;
	} catch (error) {
		console.log('SECRETS ERROR:', error);

		throw new Error('An internal error occurred');
	}
}
