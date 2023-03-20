export interface InvoiceEvent {
	event: Event;
}

export interface Event {
	log: Log;
}

export interface Log {
	invoice?: Invoice;
	type: string;
}

export interface Invoice {
	amount: number;
	brcode: string;
	created: string;
	descriptions: unknown[];
	discountAmount: number;
	discounts: unknown[];
	due: string;
	expiration: number;
	fee: number;
	fine: number;
	fineAmount: number;
	id: string;
	interest: number;
	interestAmount: number;
	link: string;
	name: string;
	nominalAmount: number;
	pdf: string;
	status: string;
	tags: unknown[];
	taxId: string;
	transactionIds: unknown[];
	updated: string;
}
