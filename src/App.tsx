import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Favorites from './pages/favorites';
import Login from './pages/login';
import TeaDetail from './pages/teaDetail';
import TeaList from './pages/teaList';

const App: React.FC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route exact path="/favorites">
					<Favorites />
				</Route>
				<Route exact path="/tea-list">
					<TeaList />
				</Route>
				<Route exact path="/tea/:id">
					<TeaDetail teaName="Shui Xian" />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
