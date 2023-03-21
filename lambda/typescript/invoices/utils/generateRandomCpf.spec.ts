import { generateRandomCpf } from './generateRandomCpf';

describe('generateRandomCpf utils function', () => {
	it('should generate a valid CPF number', () => {
		const cpf = generateRandomCpf();
		const regex = /^\d{3}\d{3}\d{3}\d{2}$/;

		expect(cpf).toMatch(regex);
	});
});
