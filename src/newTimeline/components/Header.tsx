import React from 'react';
import { headerHeight } from './const';

interface Props {
	toggleLeft: () => void;
}

const Header: React.FC<Props> = ({ toggleLeft }) => {
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				height: headerHeight,
				overflow: 'hidden',
				background: 'white',
				borderBottom: 'solid 1px black'
			}}
		>
			<button onClick={toggleLeft}>toggle left</button>
			<div>end</div>
		</div>
	);
};

export default Header;
