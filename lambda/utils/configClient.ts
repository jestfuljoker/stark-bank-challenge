import { Project } from 'starkbank';

export function configClient(privateKey: string): Project {
	const user = new Project({
		id: process.env.PROJECT_ID as string,
		environment: 'sandbox',
		privateKey: privateKey,
	});

	return user;
}
