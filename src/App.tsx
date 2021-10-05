import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/redux';
import Favorites from './pages/favorites';
import Home from './pages/home';
import Login from './pages/login';
import TeaDetail from './pages/teaDetail';
import TeaLog from './pages/teaLog';
import Profile from './pages/profile';

const App: React.FC = () => {
	const isLoggedIn = useSelector((state: RootState) => state.loggedIn);

	return (
		<Router>
			<Switch>
				{!isLoggedIn && (
					<Route exact path="/">
						<Login />
					</Route>
				)}
				{isLoggedIn && (
					<Route exact path="/home">
						<Home />
					</Route>
				)}
				{isLoggedIn && (
					<Route exact path="/favorites">
						<Favorites />
					</Route>
				)}
				{isLoggedIn && (
					<Route exact path="/log">
						<TeaLog />
					</Route>
				)}
				{isLoggedIn && (
					<Route exact path="/tea/:id">
						<TeaDetail teaName="Shui Xian" />
					</Route>
				)}
				{isLoggedIn && (
					<Route exact path="/profile">
						<Profile />
					</Route>
				)}
				<Route path="*">
					{isLoggedIn && <Redirect to="/home" />}
					{!isLoggedIn && <Redirect to="/" />}
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
