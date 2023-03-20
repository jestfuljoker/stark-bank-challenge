import { Project } from 'starkbank';

export function configClient(
	privateKey: string,
	environment = 'sandbox',
): Project {
	const user = new Project({
		id: process.env.PROJECT_ID as string,
		environment,
		privateKey: privateKey,
		allowedIps: undefined,
		name: 'Christofer sandbox',
	});

	return user;
}
