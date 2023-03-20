import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { Transfer, transfer } from 'starkbank';
import { configClient, getPemContent } from '../../utils';
import { InvoiceEvent } from './types';

async function createTransfer(body: string): Promise<void> {
	const {
		event: { log },
	} = JSON.parse(body) as InvoiceEvent;

	if (log?.invoice && log.type === 'credited') {
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
				console.log(
					'Transfer made successfully!!!\nPayload:',
					JSON.stringify(createdTransfer, null, 4),
				);
			}
		}
	}
}

export async function handler(
	event: APIGatewayEvent,
	__: Context,
	callback: Callback,
): Promise<void> {
	console.log('EVENT: ', JSON.stringify(event, null, 4));

	try {
		if (event.body) {
			await createTransfer(event.body);
		}
	} catch (error) {
		console.error('ERROR: ', error);
	}

	callback(null, {
		statusCode: 200,
		body: false,
	});
}
