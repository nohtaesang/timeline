import React from 'react';
import { rulerHeight } from './const';

interface Props {
	sceneCount: number;
	currentSceneIndex: number;
	activeLeft: boolean;
	sceneWidth: number;
}

const Ruler: React.FC<Props> = ({ sceneCount, currentSceneIndex, activeLeft, sceneWidth }) => {
	const [ indexes ] = React.useState(new Array(sceneCount).fill(true));

	return (
		<div
			style={{
				height: rulerHeight,
				overflow: 'hidden',
				display: 'flex',
				background: 'white',
				borderBottom: 'solid 1px black'
			}}
		>
			{indexes.map((a, index) => (
				<div
					key={index}
					style={{
						position: 'relative',
						width: sceneWidth,
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					{index === currentSceneIndex && (
						<div
							style={{
								position: 'absolute',
								width: 20,
								height: 20,
								borderRadius: '50%',
								background: '#ff625a',
								zIndex: 1
							}}
						/>
					)}
					<div style={{ zIndex: 2 }}>{index + 1}</div>
				</div>
			))}
		</div>
	);
};

export default Ruler;
