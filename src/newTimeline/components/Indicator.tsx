import React from 'react';
import { headerHeight } from './const';

interface Props {
	sceneWidth: number;
	currentSceneIndex: number;
}

const Indicator: React.FC<Props> = ({ sceneWidth, currentSceneIndex }) => {
	return (
		<div
			style={{
				position: 'absolute',
				width: sceneWidth,
				height: '100%',
				left: sceneWidth * currentSceneIndex,
				borderRight: 'solid 1px #ff625a',
				borderLeft: 'solid 1px #ff625a'
			}}
		/>
	);
};

export default Indicator;
