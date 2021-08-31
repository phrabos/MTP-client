import React from 'react';
import Nav from '../components/nav';

interface Props {
	teaName: string;
}

const TeaDetail: React.FC<Props> = ({ teaName }) => {
	return (
		<>
			<Nav />
			<h1>Tea Detail Page</h1>
			<p>{teaName}</p>
		</>
	);
};

export default TeaDetail;
