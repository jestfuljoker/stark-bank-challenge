import { faker } from '@faker-js/faker';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '.';
import starkbank from 'starkbank';

const mockCallback = jest.fn();

const event = {
	body: JSON.stringify({
		event: {
			log: {
				invoice: {
					status: 'paid',
					amount: Number.parseInt(faker.finance.amount()),
				},
				type: 'credited',
			},
		},
	}),
} as APIGatewayProxyEvent;

describe('transfers lambda', () => {
	it('should create a transfer and return 200 statusCode', async () => {
		const transfersCreateSpy = jest.spyOn(starkbank.transfer, 'create');

		await handler(event, {} as Context, mockCallback);

		expect(transfersCreateSpy).toHaveBeenCalledTimes(1);
		expect(mockCallback).toBeCalledWith(null, {
			statusCode: 200,
			body: true,
		});
	});

	it('should return 500 if transfer has an invalid id', async () => {
		jest
			.spyOn(starkbank.transfer, 'create')
			.mockResolvedValue([{ id: '' }] as starkbank.Transfer[]);

		await handler(event, {} as Context, mockCallback);

		expect(mockCallback).toBeCalledWith('INTERNAL_ERROR', {
			statusCode: 500,
			body: JSON.stringify({
				error: true,
				message: 'An internal error occurred to generate transfers',
			}),
		});
	});
});
