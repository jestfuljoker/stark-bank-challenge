import { Callback, Context } from 'aws-lambda';

export async function handler(event: unknown, _: Context, callback: Callback) {
	console.log(event);

	callback(null, {
		status: 200,
		body: JSON.stringify({ ola: 'mundo' }),
	});
}
