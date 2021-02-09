import React from 'react';
import './App.css';

import { Timeline, getTimelineModel, getSequenceModels, TimelineHandle } from './newTimeline';

function App() {
	const sequences: { id: string; left: number; right: number }[] = [
		{
			id: 'a',
			left: 3,
			right: 8
		}
		// {
		// 	id: 'c',
		// 	left: 5,
		// 	right: 60
		// },
		// {
		// 	id: 'b',
		// 	left: 50,
		// 	right: 80
		// },
		// {
		// 	id: 'e',
		// 	left: 3,
		// 	right: 5
		// },
		// {
		// 	id: 'f',
		// 	left: 1,
		// 	right: 10
		// },
		// {
		// 	id: 'g',
		// 	left: 6,
		// 	right: 7
		// }
	];

	const [ timelineModel ] = React.useState(getTimelineModel(100, 6, getSequenceModels(sequences)));
	const [ timelineHandle, setTimelineHandle ] = React.useState<TimelineHandle | null>(null);

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
			<div style={{ width: '600px', height: '200px' }}>
				<Timeline timelineModel={timelineModel} setHandle={setTimelineHandle} />
			</div>
		</div>
	);
}

export default App;
