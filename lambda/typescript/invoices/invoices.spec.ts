import { Context } from 'aws-lambda';
import starkbank from 'starkbank';
import { handler } from '.';

const mockCallback = jest.fn();

describe('Invoices Lambda', () => {
	it('should create invoices and return 200 statusCode', async () => {
		const invoiceCreateSpy = jest.spyOn(starkbank.invoice, 'create');

		await handler({}, {} as Context, mockCallback);

		expect(invoiceCreateSpy).toHaveBeenCalledTimes(1);
		expect(mockCallback).toHaveBeenCalledWith(null, {
			statusCode: 200,
			body: true,
		});
	});

	it('should return 500 if invoices has an invalid id', async () => {
		jest
			.spyOn(starkbank.invoice, 'create')
			.mockResolvedValue([{ id: '' }] as starkbank.Invoice[]);

		await handler({}, {} as Context, mockCallback);

		expect(mockCallback).toHaveBeenCalledWith('INTERNAL_ERROR', {
			statusCode: 500,
			body: JSON.stringify({
				error: true,
				message: 'An internal error occurred to generate invoices',
			}),
		});
	});
});
