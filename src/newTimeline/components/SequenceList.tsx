import React from 'react';
import { TimelineModel, SequenceModel } from '../models';
import SequenceItem from './SequenceItem';
import { Handle } from '../types';
import { StateValue } from '../machines';

interface Props {
	state: StateValue;
	handle: Handle;
	sequences: SequenceModel[];
	activeLeft: boolean;
	scrollLeft: number;
	timelineWidth: number;
	sceneWidth: number;
	onClickNavigation: (sequence: SequenceModel, isLeft: boolean) => void;
	onResizeSequence: (event: any, index: number, isLeft: boolean) => void;
	onDragSequence: (event: any) => void;
}

const SequenceList: React.FC<Props> = ({
	state,
	handle,
	sequences,
	activeLeft,
	scrollLeft,
	timelineWidth,
	sceneWidth,
	onClickNavigation,
	onResizeSequence,
	onDragSequence
}) => {
	return (
		<React.Fragment>
			{sequences.map((sequence, index) => (
				<SequenceItem
					key={sequence.id}
					{...{
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
					}}
				/>
			))}
		</React.Fragment>
	);
};

export default SequenceList;
