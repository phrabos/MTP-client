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
	// getSingleTea,
	// Tea,
	// updateTea,
} from '../utils/apiUtils';
import { Brew, Tea } from '../utils/types';

const TeaLog: React.FC = () => {
	const dispatch = useDispatch();
	const brewArray = useSelector((state: RootState) => state.brewArray);
	const teaArray = useSelector((state: RootState) => state.teaArray);
	const user = useSelector((state: RootState) => state.user);

	const [loading, setLoading] = useState(false);
	const [isAddBrew, setIsAddBrew] = useState(false);
	const [isAddTea, setIsAddTea] = useState(false);
	const [brewFormInput, setBrewFormInput] = useState<Brew>({
		weight: undefined,
		waterVolume: undefined,
		temperature: undefined,
		time: undefined,
		infusions: undefined,
		notes: '',
		tag: '',
		teaID: 0,
	});
	const [teaFormInput, setTeaFormInput] = useState<Tea>({
		teaName: undefined,
		cultivar: undefined,
		elevation: undefined,
		harvestYear: undefined,
		inStock: false,
		origin: undefined,
		quantity: undefined,
		teaType: undefined,
		vendorName: undefined,
	});

	// useEffect(() => {
	// 	setLoading(true);
	// 	getAllTeas().then((arr) => {
	// 		setTeaArray(arr);
	// 		setLoading(false);
	// 	});
	// }, []);

	const handleBrewSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		addBrew({ ...brewFormInput, userID: user.id })
			.then(() => {
				setLoading(true);
				return getAllBrews(user.id);
			})
			.then((brewArray) => {
				dispatch({ type: 'GETBREWLOG', brewArray });
				setLoading(false);
			});
		setIsAddBrew(false);
	};

	const handleTeaSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		addTea({ ...teaFormInput, userID: user.id })
			.then((tea) => {
				setBrewFormInput((prev) => {
					return { ...prev, teaID: tea.id };
				});
				setLoading(true);
				return getAllTeas(user.id);
			})
			.then((teaArray) => {
				dispatch({ type: 'GETTEALOG', teaArray });
				setLoading(false);
			});
		setIsAddTea(false);
		setIsAddBrew(true);
	};

	const handleBrewFormInputChange = (
		event: React.FormEvent<HTMLInputElement>
	): void => {
		const { name } = event.target as HTMLInputElement;
		const { value } = event.target as HTMLInputElement;
		console.log(name, value);
		setBrewFormInput((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleTeaFormInputChange = (
		event: React.FormEvent<HTMLInputElement>
	): void => {
		const { name } = event.target as HTMLInputElement;
		const { value } = event.target as HTMLInputElement;
		console.log(name, value);
		setTeaFormInput((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleTeaClick = (event: React.MouseEvent<HTMLElement>): void => {
		const { id } = event.target as HTMLInputElement;

		setIsAddTea(false);
		setIsAddBrew(true);
		setBrewFormInput((prev) => {
			return { ...prev, teaID: +id };
		});
	};
	return (
		<>
			<Nav />
			<h1>Tea Log Page</h1>
			{loading && <h1>Loading...</h1>}
			{brewArray.length > 0 &&
				brewArray.map((brew) => {
					return (
						<p key={brew.id}>{`brewID: ${brew.id} teaID:${brew.teaID}`}</p>
					);
				})}

			{!isAddTea && <button onClick={() => setIsAddTea(true)}>new brew</button>}
			{isAddTea && (
				<div>
					<section>
						<h3>
							click to add existing tea or fill in the form to add a new tea
						</h3>
						{teaArray.length > 0 &&
							teaArray.map((tea) => {
								return (
									<p
										id={tea.id?.toString()}
										onClick={handleTeaClick}
										key={tea.id}
									>{`teaID: ${tea.id} name:${tea.teaName}`}</p>
								);
							})}
						<form onSubmit={handleTeaSubmit}>
							<input
								name="teaName"
								value={teaFormInput.teaName}
								onChange={handleTeaFormInputChange}
								type="text"
								placeholder="name of tea"
							/>
							<input
								name="cultivar"
								value={teaFormInput.cultivar}
								onChange={handleTeaFormInputChange}
								type="text"
								placeholder="cultivar"
							/>
							<input
								name="elevation"
								value={teaFormInput.elevation}
								onChange={handleTeaFormInputChange}
								type="text"
								placeholder="elevation"
							/>
							<input
								name="harvestYear"
								value={teaFormInput.harvestYear}
								onChange={handleTeaFormInputChange}
								type="text"
								placeholder="harvest year"
							/>
							<label>
								<input
									name="inStock"
									checked={teaFormInput.inStock}
									onChange={() =>
										setTeaFormInput((prev) => {
											return { ...prev, inStock: !prev.inStock };
										})
									}
									type="checkbox"
								/>
								in Stock
							</label>
							<input
								name="origin"
								value={teaFormInput.origin}
								onChange={handleTeaFormInputChange}
								type="text"
								placeholder="origin"
							/>
							<input
								name="quantity"
								value={teaFormInput.quantity}
								onChange={handleTeaFormInputChange}
								type="text"
								placeholder="quantity"
							/>
							<input
								name="teaType"
								value={teaFormInput.teaType}
								onChange={handleTeaFormInputChange}
								type="text"
								placeholder="tea type"
							/>
							<input
								name="vendorName"
								value={teaFormInput.vendorName}
								onChange={handleTeaFormInputChange}
								type="text"
								placeholder="vendor name"
							/>
							<button type="submit">add tea</button>
							<button
								type="submit"
								onClick={(event) => {
									event.preventDefault();
									setIsAddTea(false);
									setIsAddBrew(true);
								}}
							>
								cancel
							</button>
						</form>
					</section>
				</div>
			)}
			{isAddBrew && (
				<div>
					<section>
						<form onSubmit={handleBrewSubmit}>
							<input
								name="weight"
								value={brewFormInput.weight}
								onChange={handleBrewFormInputChange}
								type="text"
								placeholder="weight grams"
							/>
							<input
								name="waterVolume"
								value={brewFormInput.waterVolume}
								onChange={handleBrewFormInputChange}
								type="text"
								placeholder="water volume ml"
							/>
							<input
								name="temperature"
								value={brewFormInput.temperature}
								onChange={handleBrewFormInputChange}
								type="text"
								placeholder="temp C"
							/>
							<input
								name="time"
								value={brewFormInput.time}
								onChange={handleBrewFormInputChange}
								type="text"
								placeholder="seconds steeped"
							/>
							<input
								name="infusions"
								value={brewFormInput.infusions}
								onChange={handleBrewFormInputChange}
								type="text"
								placeholder="infusions"
							/>
							<input
								name="notes"
								value={brewFormInput.notes}
								onChange={handleBrewFormInputChange}
								type="text"
								placeholder="notes"
							/>
							<input
								name="tag"
								value={brewFormInput.tag}
								onChange={handleBrewFormInputChange}
								type="text"
								placeholder="tag"
							/>
							<button type="submit">add to log</button>
							<button
								type="submit"
								onClick={(event) => {
									event.preventDefault();
									setIsAddBrew(false);
								}}
							>
								cancel
							</button>
						</form>
					</section>
				</div>
			)}
		</>
	);
};

export default TeaLog;
