interface Tea {
	id: number;
	name: string;
}

const DEV = 'http://localhost:8000';

export async function getAllTeas(): Promise<Tea[]> {
	const data = await fetch(`${DEV}/teas`);
	const json = await data.json();
	console.log(json);

	return json;
}
