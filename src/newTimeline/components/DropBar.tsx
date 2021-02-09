import React from 'react';
import { TimelineModel, SequenceModel } from '../models';
import SequenceItem from './SequenceItem';
import { Handle } from '../types';
import { sequenceHeight } from './const';
import { StateValue } from '../machines';

interface Props {
	state: StateValue;
	handle: Handle;
	sequence?: SequenceModel;
	index: number;
	activeLeft: boolean;
}
const DropBar: React.FC<Props> = ({ state, handle, sequence, index, activeLeft }) => {
	const height = index === -1 ? 0 : sequenceHeight;

	return <div style={{ position: 'relative', width: '100%', height, pointerEvents: 'none' }} />;
};

export default DropBar;
