import { deleteTea, getAllTeas } from './utils/apiUtils';

const App: React.FC = () => {
	return (
		<div className="App">
			<h1>working</h1>
			<button onClick={() => getAllTeas().then(console.log)}>get all</button>
			<button onClick={() => deleteTea(1).then(console.log)}>delete</button>
		</div>
	);
};

export default App;
