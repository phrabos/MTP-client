import React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/nav';
import { RootState } from '../store/redux';
import { deleteTea, getAllTeas, updateTea } from '../utils/apiUtils';

const Favorites: React.FC = () => {
	const user = useSelector((state: RootState) => state.user);
	return (
		<>
			<Nav />
			<h1>Favorites Page</h1>
			<button onClick={() => getAllTeas(user.id).then(console.log)}>
				get all
			</button>
			<button onClick={() => deleteTea(1).then(console.log)}>delete</button>
			<button
				onClick={() =>
					updateTea(2, { teaType: 'dark tea', userID: 1 }).then(console.log)
				}
			>
				update
			</button>
		</>
	);
};

export default Favorites;
