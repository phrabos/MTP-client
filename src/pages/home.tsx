import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../components/nav';
import { RootState } from '../store/redux';
import { getAllTeas, getAllBrews } from '../utils/apiUtils';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const teaArray = useSelector((state: RootState) => state.teaArray);
	console.log(teaArray);
	const user = useSelector((state: RootState) => state.user);
	console.log('selector', user);
	useEffect(() => {
		getAllTeas(user.id).then((teaArray) => {
			console.log(teaArray);
			dispatch({ type: 'GETTEALOG', teaArray });
		});
		getAllBrews(user.id).then((brewArray) => {
			dispatch({ type: 'GETBREWLOG', brewArray });
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
