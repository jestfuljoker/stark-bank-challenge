import { Callback, Context } from 'aws-lambda';
import { invoice } from 'starkbank';
import { configClient, getPemContent } from '../../utils';
import { createInvoices } from './helpers';

type Result = {
	error: string | null;
	data: unknown;
};

export async function handler(
	_: unknown,
	__: Context,
	callback: Callback,
): Promise<void> {
	let result: Result = {
		error: null,
		data: null,
	};

	try {
		const privateKey = await getPemContent();

		const user = configClient(privateKey);

		const invoices = await invoice.create(createInvoices(), {
			user,
		});

		if (!invoices.every((invoice) => !!invoice)) {
			throw new Error('INTERNAL_ERROR');
		}

		result = {
			...result,
			data: {
				statusCode: 200,
				body: true,
			},
		};
	} catch (error) {
		console.log('ERROR:', error);

		result = {
			error: 'INTERNAL_ERROR',
			data: {
				statusCode: 500,
				body: JSON.stringify({
					error: true,
					message: 'An internal error occurred to generate invoices',
				}),
			},
		};
	}

	callback(result.error, result.data);
}
