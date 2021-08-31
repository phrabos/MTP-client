import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
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
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/tea-list">Tea List</Link>
				</li>
				<li>
					<Link to="/favorites">Favorites</Link>
				</li>
				<li>
					<Link to="/">Logout</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
