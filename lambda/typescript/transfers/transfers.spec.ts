import { faker } from '@faker-js/faker';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '.';
import starkbank from 'starkbank';

const mockCallback = jest.fn();

const body = {
	event: {
		log: {
			invoice: {
				status: 'paid',
				amount: Number.parseInt(faker.finance.amount()),
			},
			type: 'credited',
		},
	},
};

describe('transfers lambda', () => {
	it('should create a transfer and return 200 statusCode', async () => {
		const transfersCreateSpy = jest.spyOn(starkbank.transfer, 'create');

		const event = {
			body: JSON.stringify(body),
		} as APIGatewayProxyEvent;

		await handler(event, {} as Context, mockCallback);

		expect(transfersCreateSpy).toHaveBeenCalledTimes(1);

		expect(mockCallback).toBeCalledWith(null, {
			statusCode: 200,
			body: true,
		});
	});
});
