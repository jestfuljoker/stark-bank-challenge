import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { Transfer, transfer } from 'starkbank';
import { configClient, getPemContent } from '../../utils';
import { InvoiceEvent } from './types';

type Result = {
	error: string | null;
	data: unknown;
};

async function createTransfer(body: string): Promise<void> {
	const {
		event: { log },
	} = JSON.parse(body) as InvoiceEvent;

	if (log?.invoice && log.type === 'credited') {
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

			if (!createdTransfer.every((transfer) => !!transfer.id)) {
				throw new Error('INTERNAL_ERROR');
			}
		}
	}
}

export async function handler(
	event: APIGatewayEvent,
	__: Context,
	callback: Callback,
): Promise<void> {
	let result: Result = {
		error: null,
		data: {
			statusCode: 200,
			body: false,
		},
	};

	try {
		if (event.body) {
			await createTransfer(event.body);
		}
	} catch (error) {
		console.error('ERROR: ', error);

		result = {
			error: (error as Error).message,
			data: {
				statusCode: 500,
				body: JSON.stringify({
					error: true,
					message: 'An internal error occurred to generate transfers',
				}),
			},
		};
	}

	callback(result.error, result.data);
}
