import { createInvoices } from './createInvoices';

describe('createInvoices helper function', () => {
	it('should create an array of invoices with random data', () => {
		const invoices = createInvoices();

		expect(invoices.length).toBeGreaterThanOrEqual(8);
		expect(invoices.length).toBeLessThanOrEqual(12);
	});

	it('should create an array of invoices with valid amounts', () => {
		const invoices = createInvoices();

		for (const invoice of invoices) {
			expect(invoice.amount).toBeGreaterThanOrEqual(50);
			expect(invoice.amount).toBeLessThanOrEqual(2000);
		}
	});

	it('should create an array of invoices with valid customer name', () => {
		const invoices = createInvoices();

		for (const invoice of invoices) {
			expect(invoice.name).toBeDefined();
			expect(invoice.name).not.toBeNull();
			expect(typeof invoice.name).toBe('string');
		}
	});
});
