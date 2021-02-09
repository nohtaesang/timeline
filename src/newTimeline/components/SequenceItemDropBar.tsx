import React from 'react';
import { SequenceModel } from '../models';
import SequenceItemNavigation from './SequenceItemNavigation';
import { sequenceHeight } from './const';
import SequenceItemContent from './SequenceItemContent';
import { Handle } from '../types';
import SequenceItemContentResizeHandler from './SequenceItemContentResizeHandler';
import { StateValue } from '../machines';

interface Props {
	state: StateValue;
	handle: Handle;
	sequence: SequenceModel;
	index: number;
	activeLeft: boolean;
	scrollLeft: number;
	timelineWidth: number;
	sceneWidth: number;
	onClickNavigation: (sequence: SequenceModel, isLeft: boolean) => void;
	onResizeSequence: (event: any, index: number, isLeft: boolean) => void;
	onDragSequence: (event: any) => void;
}
const SequenceItemDropBar: React.FC<Props> = ({
	state,
	handle,
	sequence,
	index,
	activeLeft,
	scrollLeft,
	timelineWidth,
	sceneWidth,
	onClickNavigation,
	onResizeSequence,
	onDragSequence
}) => {
	const { dragged, selected } = sequence;
	const [ isDragEnter, setIsDragEnter ] = React.useState(false);

	React.useEffect(
		() => {
			if (state === 'drag') setIsDragEnter(false);
		},
		[ state ]
	);

	const getTopOrBottom = () => {
		if (index === -1) {
			return { top: -10 };
		} else {
			return { bottom: -10 };
		}
	};

	if (state !== 'drag' || (selected && index !== -1)) return null;

	return (
		<div
			style={{
				position: 'absolute',
				...getTopOrBottom(),
				width: '100%',
				height: 20,
				display: 'flex',
				alignItems: 'center'
			}}
			onDragEnter={(e) => {
				e.stopPropagation();
				setIsDragEnter(true);
			}}
			onDragLeave={(e) => {
				e.stopPropagation();
				setIsDragEnter(false);
			}}
			onDragOver={(e) => e.preventDefault()}
			onDrop={() => console.log('drop')}
		>
			{isDragEnter && (
				<div
					style={{
						width: '100%',
						height: '4px',
						background: '#ff625a',
						pointerEvents: 'none'
					}}
				/>
			)}
		</div>
	);
};

export default SequenceItemDropBar;
