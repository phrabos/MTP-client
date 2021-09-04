export interface User {
	id: number;
	email: string;
	username: string;
}

export interface AuthState {
	loggedIn: Boolean;
	idToken: String | null;
	teaArray: Tea[];
	brewArray: Brew[];
	user: User;
}

export interface Action {
	type: string;
	token: string | null;
	teaArray: Tea[];
	brewArray: Brew[];
	user: User;
}

export interface Tea {
	id?: number;
	teaName?: string;
	cultivar?: string;
	elevation?: number;
	harvestYear?: number;
	inStock?: boolean;
	origin?: string;
	quantity?: number;
	teaType?: string;
	vendorName?: string;
	userID?: number | null;
}

export interface Brew {
	id?: number;
	teaID?: number;
	userID?: number;
	weight?: number;
	waterVolume?: number;
	temperature?: number;
	time?: number;
	infusions?: number;
	notes?: string;
	tag?: string;
}

export interface Auth {
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
	user: User;
}

export interface JSONResponse {
	data?: Auth['data'];
	errors?: string;
	user?: Auth['user'];
}
