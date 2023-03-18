import { faker } from '@faker-js/faker';
import { Invoice } from 'starkbank';
import { generateRandomCpf, getRandomNumber } from '../utils';

export function createInvoices(): Invoice[] {
	const numberInvoices = getRandomNumber(8, 12);

	const invoices: Invoice[] = [];

	for (let index = 0; index <= numberInvoices; index++) {
		invoices.push(
			new Invoice({
				amount: Number.parseInt(faker.finance.amount(50, 2000)),
				name: faker.name.fullName(),
				taxId: generateRandomCpf(),
			}),
		);
	}

	return invoices;
}
