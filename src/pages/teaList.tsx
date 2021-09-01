import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import {
	addTea,
	deleteTea,
	getAllTeas,
	Tea,
	updateTea,
} from '../utils/apiUtils';

const TeaList: React.FC = () => {
	const [teaArray, setTeaArray] = useState<Tea[]>([]);
	const [loading, setLoading] = useState(false);
	const [isAddTea, setIsAddTea] = useState(false);

	useEffect(() => {
		setLoading(true);
		getAllTeas().then((arr) => {
			setTeaArray(arr);
			setLoading(false);
		});
	}, []);

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		addTea({
			name: 'test Li Shan 2',
			teaType: 'Oolong',
			origin: 'Taiwan',
			cultivar: 'unknown',
			harvestYear: 2019,
			vendorName: 'Nannuoshan',
		})
			.then(() => {
				setLoading(true);
				return getAllTeas();
			})
			.then((data) => {
				setTeaArray(data);
				setLoading(false);
			});
		setIsAddTea(false);
	};

	return (
		<>
			<Nav />
			<h1>Tea List Page</h1>
			{loading && <h1>Loading...</h1>}
			{teaArray.length > 0 &&
				teaArray.map((tea) => {
					return <p key={tea.id}>{tea.name}</p>;
				})}

			{!isAddTea && <button onClick={() => setIsAddTea(true)}>new tea</button>}
			{isAddTea && (
				<div>
					<section>
						<form onSubmit={handleSubmit}>
							<input type="text" placeholder="name" />
							<input type="text" placeholder="type" />
							<input type="text" placeholder="origin" />
							<input type="text" placeholder="cultivar" />
							<input type="date" placeholder="harvest date" />
							<input type="text" placeholder="vendor" />
							<button type="submit">add to log</button>
						</form>
					</section>
				</div>
			)}
		</>
	);
};

export default TeaList;
