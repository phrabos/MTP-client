import React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/nav';
import { RootState } from '../store/redux';

const Profile: React.FC = () => {
	const teaArray = useSelector((state: RootState) => state.teaArray);
	return (
		<>
			<Nav />
			<h1>Profile Page</h1>
			<span>Number of teas logged: {teaArray.length}</span>
		</>
	);
};

export default Profile;
