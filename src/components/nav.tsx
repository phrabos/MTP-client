import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/redux';
import { useHistory } from 'react-router-dom';
import { logUserOut } from '../utils/apiUtils';

const Nav: React.FC = () => {
	const isLoggedIn = useSelector((state: RootState) => state.loggedIn);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogout = () => {
		dispatch({ type: 'REMOVETOKEN' });
		logUserOut();
		history.replace('/');
	};

	return (
		<nav>
			<ul
				style={{
					display: 'flex',
					flexDirection: 'row',
					listStyle: 'none',
					width: '100vw',
					height: '5vh',
					justifyContent: 'space-around',
					alignItems: 'center',
					border: '1px solid black',
				}}
			>
				{!isLoggedIn && (
					<li>
						<Link to="/">Login</Link>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<Link to="/home">Home</Link>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<Link to="/tea-list">Tea List</Link>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<Link to="/favorites">Favorites</Link>
					</li>
				)}
				{isLoggedIn && (
					<li onClick={handleLogout}>
						<Link to="/">Logout</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
