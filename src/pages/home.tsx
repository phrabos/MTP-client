import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../components/nav';
import { RootState } from '../store/redux';
import { getAllTeas, getAllBrews } from '../utils/apiUtils';
import { Brew, Tea } from '../utils/types';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const teaArray = useSelector((state: RootState) => state.teaArray);
	console.log(teaArray);
	const brewArray = useSelector((state: RootState) => state.brewArray);
	const user = useSelector((state: RootState) => state.user);

	useEffect(() => {
		getAllTeas(user.id).then((teaArray) => {
			console.log(teaArray);
			dispatch({ type: 'GETTEALOG', teaArray });
		});
		getAllBrews(user.id).then((brewArray) => {
			dispatch({ type: 'GETBREWLOG', brewArray });
		});
	}, [dispatch, user]);

	const recentTeas = (
		arr1: Brew[],
		arr2: Tea[],
		index: number
	): Tea | undefined => {
		console.log(arr1, arr2);
		const first = arr2.find(
			(tea) => arr1[arr1.length - index]?.teaID?.toString() === tea.id
		);

		return first;
	};

	console.log('recentTeas', recentTeas(brewArray, teaArray, 0));
	return (
		<>
			<Nav />
			<h1>Welcome to the home page...</h1>
			<section>Recently Brewed Teas</section>
			{brewArray[brewArray.length - 1] && (
				<p>{recentTeas(brewArray, teaArray, 1)?.teaName}</p>
			)}
			{brewArray[brewArray.length - 2] && (
				<p>{recentTeas(brewArray, teaArray, 2)?.teaName}</p>
			)}
			{brewArray[brewArray.length - 3] && (
				<p>{recentTeas(brewArray, teaArray, 3)?.teaName}</p>
			)}
			{brewArray[20] && <p>{brewArray[20].id}</p>}
		</>
	);
};

export default Home;
