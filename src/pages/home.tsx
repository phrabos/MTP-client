import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../components/nav';
import { RootState } from '../store/redux';
import { getAllTeas, getAllBrews } from '../utils/apiUtils';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const teaArray = useSelector((state: RootState) => state.teaArray);
	const user = useSelector((state: RootState) => state.user);
	console.log('selector', user);
	useEffect(() => {
		getAllTeas(user.id).then((teasArray) => {
			dispatch({ type: 'GETTEALOG', teasArray });
		});
		getAllBrews(user.id).then((brewsArray) => {
			dispatch({ type: 'GETTEALOG', brewsArray });
		});
	}, [dispatch, user]);

	return (
		<>
			<Nav />
			<h1>Welcome to the home page...</h1>
			<section>Recently Brewed Teas</section>
			{teaArray[teaArray.length - 1] && (
				<p>{teaArray[teaArray.length - 1].teaName}</p>
			)}
			{teaArray[teaArray.length - 2] && (
				<p>{teaArray[teaArray.length - 2].teaName}</p>
			)}
			{teaArray[teaArray.length - 3] && (
				<p>{teaArray[teaArray.length - 3].teaName}</p>
			)}
			{teaArray[20] && <p>{teaArray[20].teaName}</p>}
		</>
	);
};

export default Home;
