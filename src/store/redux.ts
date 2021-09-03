import { createStore } from 'redux';
import { Action, AuthState } from '../utils/types';

const initialToken = localStorage.getItem('TOKEN');

const initialState = {
	loggedIn: !!initialToken,
	idToken: initialToken,
	teaArray: [],
	brewArray: [],
	user: {
		id: 0,
		email: '',
		username: '',
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
			brewArray: state.brewArray,
			user: state.user,
		};
	}
	if (action.type === 'REMOVETOKEN') {
		return {
			loggedIn: false,
			idToken: '',
			teaArray: state.teaArray,
			brewArray: state.brewArray,
			user: state.user,
		};
	}
	if (action.type === 'GETTEALOG') {
		return {
			loggedIn: state.loggedIn,
			idToken: state.idToken,
			teaArray: action.teaArray,
			brewArray: state.brewArray,
			user: state.user,
		};
	}
	if (action.type === 'GETBREWLOG') {
		return {
			loggedIn: state.loggedIn,
			idToken: state.idToken,
			teaArray: state.teaArray,
			brewArray: action.brewArray,
			user: state.user,
		};
	}
	if (action.type === 'SETUSER') {
		return {
			loggedIn: state.loggedIn,
			idToken: state.idToken,
			teaArray: state.teaArray,
			brewArray: state.brewArray,
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
