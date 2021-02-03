import React from 'react';
import './App.css';
import { Timeline } from './timeline';

import { getTimelineModel, getSequenceModels } from './timeline/utils';

function App() {
	const sequences: { id: string; left: number; right: number }[] = [
		{
			id: 'a',
			left: 3,
			right: 8
		},
		{
			id: 'c',
			left: 5,
			right: 60
		},
		{
			id: 'b',
			left: 50,
			right: 80
		}
	];

	const [ timelineModel ] = React.useState(getTimelineModel(100, 6, getSequenceModels(sequences)));

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<div style={{ width: '100%' }}>
				<Timeline timelineModel={timelineModel} />
			</div>
		</div>
	);
}

export default App;
