export interface Tea {
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

interface Auth {
	data: {
		kind: string;
		localId: string;
		email: string;
		displayName?: string;
		idToken: string;
		registered?: boolean;
		refreshToken: true;
		expiresIn: string;
	};
	user: {
		username: string;
		email: string;
	};
}

// interface AuthError {
// 	error: {
// 		code: number;
// 		message: string;
// 		errors: [];
// 	};
// }

interface JSONResponse {
	data?: Auth['data'];
	errors?: string;
	user?: Auth['user'];
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

export async function addTea(dataObj: Tea): Promise<Tea> {
	const data = await fetch(`${DEV}/teas/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataObj),
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

export async function userAuthenticate(
	url: string,
	email: string,
	password: string
): Promise<Auth> {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const { data, user, errors }: JSONResponse = await response.json();

	if (data && user) return { data, user };
	else {
		const err = new Error(errors ?? 'Unknown');
		return Promise.reject(err);
	}
}
export const logUserOut = async () => {
	const res = await fetch(`${DEV}/account/logout`, {
		credentials: 'include',
	});
	const json = await res.json();
	localStorage.removeItem('TOKEN');
	return json;
};
