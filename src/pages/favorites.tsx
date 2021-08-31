import React from 'react';
import Nav from '../components/nav';
import { deleteTea, getAllTeas, updateTea } from '../utils/apiUtils';

const Favorites: React.FC = () => {
	return (
		<>
			<Nav />
			<h1>Favorites Page</h1>
			<button onClick={() => getAllTeas().then(console.log)}>get all</button>
			<button onClick={() => deleteTea(1).then(console.log)}>delete</button>
			<button
				onClick={() => updateTea(2, { teaType: 'dark tea' }).then(console.log)}
			>
				update
			</button>
		</>
	);
};

export default Favorites;
