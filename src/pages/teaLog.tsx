import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../components/nav';
import { RootState } from '../store/redux';
import {
	addTea,
	addBrew,
	// deleteTea,
	getAllTeas,
	getAllBrews,
	// Tea,
	// updateTea,
} from '../utils/apiUtils';
import { Brew } from '../utils/types';

const TeaLog: React.FC = () => {
	const dispatch = useDispatch();
	const brewArray = useSelector((state: RootState) => state.brewArray);
	const user = useSelector((state: RootState) => state.user);

	const [loading, setLoading] = useState(false);
	const [isAddTea, setIsAddTea] = useState(false);
	const [formInput, setFormInput] = useState<Brew>({
		teaName: '',
		weight: 0,
		waterVolume: 0,
		temperature: 0,
		time: 0,
		infusions: 0,
		notes: '',
		tag: '',
		teaType: '',
		vendorName: '',
	});

	// useEffect(() => {
	// 	setLoading(true);
	// 	getAllTeas().then((arr) => {
	// 		setTeaArray(arr);
	// 		setLoading(false);
	// 	});
	// }, []);

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		addBrew({ ...formInput, userID: user.id, teaID: 1, teaName: 'Ali Shan' })
			.then(() => {
				setLoading(true);
				return getAllBrews(user.id);
			})
			.then((brewArray) => {
				dispatch({ type: 'GETBREWLOG', brewArray });
				setLoading(false);
			});
		setIsAddTea(false);
	};

	const handleFormInputChange = (
		event: React.FormEvent<HTMLInputElement>
	): void => {
		setFormInput({ [event.currentTarget.id]: event.currentTarget.value });
	};

	return (
		<>
			<Nav />
			<h1>Tea Log Page</h1>
			{loading && <h1>Loading...</h1>}
			{brewArray.length > 0 &&
				brewArray.map((brew) => {
					return <p key={brew.id}>{brew.teaName}</p>;
				})}

			{!isAddTea && <button onClick={() => setIsAddTea(true)}>new tea</button>}
			{isAddTea && (
				<div>
					<section>
						<form onSubmit={handleSubmit}>
							<input
								id="weight"
								value={formInput.weight}
								onChange={handleFormInputChange}
								type="text"
								placeholder="weight grams"
							/>
							<input
								id="volume"
								value={formInput.waterVolume}
								onChange={handleFormInputChange}
								type="text"
								placeholder="water volume ml"
							/>
							<input
								id="temperature"
								value={formInput.temperature}
								onChange={handleFormInputChange}
								type="text"
								placeholder="temp C"
							/>
							<input
								id="time"
								value={formInput.time}
								onChange={handleFormInputChange}
								type="text"
								placeholder="seconds steeped"
							/>
							<input
								id="infusions"
								value={formInput.infusions}
								onChange={handleFormInputChange}
								type="text"
								placeholder="infusions"
							/>
							<input
								id="notes"
								value={formInput.notes}
								type="text"
								placeholder="notes"
							/>
							<input
								id="tag"
								value={formInput.tag}
								type="text"
								placeholder="tag"
							/>
							<button type="submit">add to log</button>
						</form>
					</section>
				</div>
			)}
		</>
	);
};

export default TeaLog;
