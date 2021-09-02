import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../components/nav';
import { RootState } from '../store/redux';
import { getAllTeas } from '../utils/apiUtils';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const teaArray = useSelector((state: RootState) => state.teaArray);
	const user = useSelector((state: RootState) => state.user);
	console.log('selector', user);
	useEffect(() => {
		getAllTeas(user.id).then((data) => {
			dispatch({ type: 'GETTEALOG', teaArray: data });
		});
	}, [dispatch]);

	return (
		<>
			<Nav />
			<h1>Welcome to the home page...</h1>
			<section>Recently Brewed</section>
			{teaArray[teaArray.length - 1] && (
				<p>{teaArray[teaArray.length - 1].name}</p>
			)}
			{teaArray[teaArray.length - 2] && (
				<p>{teaArray[teaArray.length - 2].name}</p>
			)}
			{teaArray[teaArray.length - 3] && (
				<p>{teaArray[teaArray.length - 3].name}</p>
			)}
			{teaArray[20] && <p>{teaArray[20].name}</p>}
		</>
	);
};

export default Home;
