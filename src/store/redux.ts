import { createStore } from 'redux';

interface AuthState {
	loggedIn: Boolean;
	idToken: String | null;
	teaArray: any[];
}

interface Action {
	type: string;
	token: string | null;
	teaArray: any[];
}

const initialToken = localStorage.getItem('TOKEN');

const initialState = {
	loggedIn: !!initialToken,
	idToken: initialToken,
	teaArray: [],
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
		};
	}
	if (action.type === 'REMOVETOKEN') {
		return {
			loggedIn: false,
			idToken: '',
			teaArray: state.teaArray,
		};
	}
	if (action.type === 'GETTEALOG') {
		return {
			loggedIn: state.loggedIn,
			idToken: state.idToken,
			teaArray: action.teaArray,
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
