import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { Transfer, transfer } from 'starkbank';
import { configClient, getPemContent } from '../../utils';
import { InvoiceEvent } from './types';

type Result = {
	error: string | null;
	data: unknown;
};

async function createTransfer(body: string) {
	const {
		event: { log },
	} = JSON.parse(body) as InvoiceEvent;

	if (log?.invoice) {
		console.log('TYPE:', log.type);
		console.log('INVOICE STATUS:', log.invoice.status);

		const { status, amount } = log.invoice;

		if (status === 'paid') {
			const privateKey = await getPemContent();

			const user = configClient(privateKey);

			const transferPayload = new Transfer({
				bankCode: '20018183',
				branchCode: '0001',
				accountNumber: '6341320293482496',
				name: 'Stark Bank S.A',
				amount,
				taxId: '20.018.183/0001-80',
				accountType: 'payment',
			});

			const createdTransfer = await transfer.create([transferPayload], {
				user,
			});

			if (createdTransfer.length > 0) {
				return {
					error: null,
					data: {
						statusCode: 200,
						body: true,
					},
				};
			}
		}

		return {
			error: null,
			data: {
				statusCode: 204,
				body: {
					message: 'no invoice data to be processed',
				},
			},
		};
	}

	return {
		error: null,
		data: {
			statusCode: 204,
			body: {
				message: 'no invoice data to be processed',
			},
		},
	};
}

export async function handler(
	event: APIGatewayEvent,
	__: Context,
	callback: Callback,
): Promise<void> {
	console.log('EVENT: ', JSON.stringify(event, null, 4));
	let result: Result = {
		error: null,
		data: null,
	};

	try {
		if (event.body) {
			result = await createTransfer(event.body);
		} else {
			throw new Error('Request has no body');
		}
	} catch (error) {
		console.error('ERROR: ', error);

		result = {
			error: 'BAD_REQUEST',
			data: {
				statusCode: 400,
				body: JSON.stringify({
					error: true,
					message: (error as Error).message,
				}),
			},
		};
	}

	callback(result.error, result.data);
}
