interface Tea {
	id?: number;
	name?: string;
	cultivar?: string;
	elevation?: number;
	harvestYear?: number;
	inStock?: boolean;
	origin?: string;
	quantity?: number;
	teaType?: string;
	vendorName?: string;
}

const DEV = 'http://localhost:8000';

export async function getAllTeas(): Promise<Tea[]> {
	const data = await fetch(`${DEV}/teas`);
	const json = await data.json();

	return json;
}

export async function deleteTea(
	id: number
): Promise<Tea[] | { message: string }> {
	const data = await fetch(`${DEV}/teas/${id}`, {
		method: 'DELETE',
	});
	const json = await data.json();

	return json;
}

export async function updateTea(id: number, dataObj: Tea): Promise<Tea> {
	const data = await fetch(`${DEV}/teas/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataObj),
	});
	const json = await data.json();

	return json;
}
