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
import TeaList from './pages/teaList';

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
					<Route exact path="/tea-list">
						<TeaList />
					</Route>
				)}

				{isLoggedIn && (
					<Route exact path="/tea/:id">
						<TeaDetail teaName="Shui Xian" />
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
