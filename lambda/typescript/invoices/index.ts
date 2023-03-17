import { Callback, Context } from 'aws-lambda';
import starkbank from 'starkbank';

export async function handler(event: unknown, _: Context, callback: Callback) {
	const user = new starkbank.Project({
		environment: 'sandbox',
		id: '6361128644902912',
		privateKey: `-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIJi2iGFS8XKWGKE8qR0JuN0RwHvWtxwR+Ykt+TgkDIIvoAcGBSuBBAAK
oUQDQgAEOYLZGLfqOl6NWg+qXXtKjbbKNIGl9WvnyHHoYC3OPsc0gA2OIVIim8bt
M4Yv4fykMD1rdIIDI0isjHGHcg9fYA==
-----END EC PRIVATE KEY-----

`,
	});

	const invoices = await starkbank.invoice.create(
		[
			new starkbank.Invoice({
				amount: 100,
				name: 'Test Invoice',
				taxId: '618.116.440-58',
			}),
		],
		{
			user,
		},
	);

	console.log(JSON.stringify(invoices, null, 4));

	callback(null, {
		status: 200,
		body: JSON.stringify({ ola: 'mundo' }),
	});
}
