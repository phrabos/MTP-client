import { Auth, Brew, JSONAuthError, JSONResponse, Tea } from './types';

// interface AuthError {
// 	error: {
// 		code: number;
// 		message: string;
// 		errors: [];
// 	};
// }

const DEV = 'http://localhost:8000';

export async function getAllTeas(id: number | null): Promise<Tea[]> {
	const data = await fetch(`${DEV}/teas/user/${id}/teas`);
	const json = await data.json();

	return json;
}

export async function getSingleTea(id: number | null): Promise<Tea> {
	const data = await fetch(`${DEV}/teas/${id}`);
	const json = await data.json();

	return json;
}

export async function getAllBrews(id: number | null): Promise<Brew[]> {
	const data = await fetch(`${DEV}/brews/${id}`);
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
	console.log(dataObj);
	const data = await fetch(`${DEV}/teas`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataObj),
	});
	const json = await data.json();

	return json;
}

export async function addBrew(dataObj: Brew): Promise<Brew> {
	console.log(dataObj);
	const data = await fetch(`${DEV}/brews/`, {
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
	try {
	} catch (err) {}
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
	try {
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

		if (response.status === 400) {
			const { error }: JSONAuthError = await response.json();
			return Promise.reject(error);
		} else {
			const { data, user }: JSONResponse = await response.json();
			return { data, user };
		}
	} catch (err) {
		console.error(err);
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
