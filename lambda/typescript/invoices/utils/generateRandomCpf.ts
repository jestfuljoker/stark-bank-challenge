export function generateRandomCpf(): string {
	let cpf = '';

	// Randomly generates the first 9 digits
	for (let index = 0; index < 9; index++) {
		cpf += Math.floor(Math.random() * 10);
	}

	// Calculates the first check digit
	let sum = 0;

	for (let index = 0; index < 9; index++) {
		sum += parseInt(cpf.charAt(index)) * (10 - index);
	}

	let rest = sum % 11;

	const digit1 = rest < 2 ? 0 : 11 - rest;

	cpf += digit1;

	// Calculates the second check digit
	sum = 0;

	for (let index = 0; index < 10; index++) {
		sum += parseInt(cpf.charAt(index)) * (11 - index);
	}

	rest = sum % 11;

	const digit2 = rest < 2 ? 0 : 11 - rest;

	cpf += digit2;

	return cpf;
}
