import { deleteTea, getAllTeas, updateTea } from './utils/apiUtils';

const App: React.FC = () => {
	return (
		<div className="App">
			<h1>working</h1>
			<button onClick={() => getAllTeas().then(console.log)}>get all</button>
			<button onClick={() => deleteTea(1).then(console.log)}>delete</button>
			<button
				onClick={() => updateTea(2, { teaType: 'dark tea' }).then(console.log)}
			>
				update
			</button>
		</div>
	);
};

export default App;
