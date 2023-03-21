import { generateRandomCpf } from './generateRandomCpf';

describe('generateRandomCpf utils function', () => {
	it('should generate a valid CPF number', () => {
		const cpf = generateRandomCpf();
		const regex = /^\d{3}\d{3}\d{3}\d{2}$/;

		expect(cpf).toMatch(regex);
	});
	it('should generate different CPF numbers on multiple runs', () => {
		const cpf1 = generateRandomCpf();
		const cpf2 = generateRandomCpf();

		expect(cpf1).not.toBe(cpf2);
	});
});
