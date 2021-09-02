import { createStore } from 'redux';

export interface User {
	id: number | null;
	email: string | null;
	username: string | null;
}

interface AuthState {
	loggedIn: Boolean;
	idToken: String | null;
	teaArray: any[];
	user: User;
}

interface Action {
	type: string;
	token: string | null;
	teaArray: any[];
	user: User;
}

const initialToken = localStorage.getItem('TOKEN');

const initialState = {
	loggedIn: !!initialToken,
	idToken: initialToken,
	teaArray: [],
	user: {
		id: null,
		email: null,
		username: null,
	},
};

const authReducer = (
	state: AuthState = initialState,
	action: Action
): AuthState => {
	if (action.type === 'SETTOKEN') {
		return {
			loggedIn: true,
			idToken: action.token,
			teaArray: state.teaArray,
			user: state.user,
		};
	}
	if (action.type === 'REMOVETOKEN') {
		return {
			loggedIn: false,
			idToken: '',
			teaArray: state.teaArray,
			user: state.user,
		};
	}
	if (action.type === 'GETTEALOG') {
		return {
			loggedIn: state.loggedIn,
			idToken: state.idToken,
			teaArray: action.teaArray,
			user: state.user,
		};
	}
	if (action.type === 'SETUSER') {
		return {
			loggedIn: state.loggedIn,
			idToken: state.idToken,
			teaArray: state.teaArray,
			user: action.user,
		};
	}
	return state;
};

const store = createStore(authReducer);

export default store;
export type RootState = ReturnType<typeof authReducer>;

// const counterSubscriber = () => {
// const latestState = store.getState();
// console.log(latestState);
// };

// store.subscribe(counterSubscriber);

// store.dispatch({ type: 'increment' });
// store.dispatch({ type: 'decrement' });
