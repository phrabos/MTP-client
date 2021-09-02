import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../components/nav';
import { RootState } from '../store/redux';
import {
	addTea,
	// deleteTea,
	getAllTeas,
	// Tea,
	// updateTea,
} from '../utils/apiUtils';

const TeaLog: React.FC = () => {
	const dispatch = useDispatch();
	const teaArray = useSelector((state: RootState) => state.teaArray);
	// const [teaArray, setTeaArray] = useState<Tea[]>([]);
	const [loading, setLoading] = useState(false);
	const [isAddTea, setIsAddTea] = useState(false);

	// useEffect(() => {
	// 	setLoading(true);
	// 	getAllTeas().then((arr) => {
	// 		setTeaArray(arr);
	// 		setLoading(false);
	// 	});
	// }, []);

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
				dispatch({ type: 'GETTEALOG', teaArray: data });
				setLoading(false);
			});
		setIsAddTea(false);
	};

	return (
		<>
			<Nav />
			<h1>Tea Log Page</h1>
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
							<input required type="text" placeholder="name" />
							<input type="text" placeholder="type" />
							<input type="text" placeholder="origin" />
							<input type="number" placeholder="quantity" />
							<input type="text" placeholder="cultivar" />
							<input type="text" placeholder="harvest date" />
							<input type="text" placeholder="vendor" />
							<button type="submit">add to log</button>
						</form>
					</section>
				</div>
			)}
		</>
	);
};

export default TeaLog;
