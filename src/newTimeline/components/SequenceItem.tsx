import React from 'react';
import { SequenceModel } from '../models';
import SequenceItemNavigation from './SequenceItemNavigation';
import { sequenceHeight } from './const';
import SequenceItemContent from './SequenceItemContent';
import { Handle } from '../types';
import SequenceItemContentResizeHandler from './SequenceItemContentResizeHandler';
import { StateValue } from '../machines';
import SequenceItemDropBar from './SequenceItemDropBar';

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
const SequenceItem: React.FC<Props> = ({
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
	return (
		<React.Fragment>
			<div
				className="sequence-side-infos-container"
				style={{
					display: 'flex',
					position: 'relative',
					height: 0,
					zIndex: 2
				}}
			>
				<SequenceItemNavigation
					{...{
						sequence,
						activeLeft,
						scrollLeft,
						timelineWidth,
						sceneWidth,
						isLeft: true,
						onClickNavigation
					}}
				/>
				<SequenceItemNavigation
					{...{
						sequence,
						activeLeft,
						scrollLeft,
						timelineWidth,
						sceneWidth,
						isLeft: false,
						onClickNavigation
					}}
				/>
			</div>
			<div
				className="sequence-row"
				style={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					height: sequenceHeight,
					width: '100%',
					cursor: 'default'
				}}
			>
				<SequenceItemContent
					{...{
						handle,
						sequence,
						activeLeft,
						index,
						scrollLeft,
						sceneWidth,
						onResizeSequence,
						onDragSequence
					}}
				/>
				{index === 0 && (
					<SequenceItemDropBar
						{...{
							state,
							handle,
							sequence,
							index: -1,
							activeLeft,
							scrollLeft,
							timelineWidth,
							sceneWidth,
							onClickNavigation,
							onResizeSequence,
							onDragSequence
						}}
					/>
				)}
				<SequenceItemDropBar
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
			</div>
		</React.Fragment>
	);
};

export default SequenceItem;
