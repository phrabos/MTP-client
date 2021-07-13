import { getAllTeas } from './utils/apiUtils';

const App: React.FC = () => {
	return (
		<div className="App">
			<h1>working</h1>
			<button onClick={() => getAllTeas()}>test</button>
		</div>
	);
};

export default App;
