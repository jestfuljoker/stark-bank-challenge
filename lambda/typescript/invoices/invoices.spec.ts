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
});
