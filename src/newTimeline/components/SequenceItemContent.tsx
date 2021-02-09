import React from 'react';
import { SequenceModel } from '../models';
import { sequenceHeight, navigationOffset, leftWidth } from './const';
import { Handle } from '../types';
import SequenceItemContentResizeHandler from './SequenceItemContentResizeHandler';

interface Props {
	handle: Handle;
	sequence: SequenceModel;
	activeLeft: boolean;
	index: number;
	scrollLeft: number;
	sceneWidth: number;
	onResizeSequence: (event: any, index: number, isLeft: boolean) => void;
	onDragSequence: (event: any) => void;
}
const SequenceItemContent: React.FC<Props> = ({
	handle,
	sequence,
	activeLeft,
	index,
	scrollLeft,
	sceneWidth,
	onResizeSequence,
	onDragSequence
}) => {
	const content = `Box, ${sequence.id}, person, visible`;
	const { selected, dragged } = sequence;

	const getPositionAndLeft = (): { position: 'absolute' | 'sticky'; left: number } => {
		let position: 'absolute' | 'sticky' = 'absolute',
			left = 0;

		if (sequence.left * sceneWidth > scrollLeft + navigationOffset) {
			position = 'absolute';
			left = sceneWidth * sequence.left;
		} else if (sequence.right * sceneWidth > scrollLeft + navigationOffset) {
			position = 'sticky';
			left = navigationOffset + (activeLeft ? leftWidth : 0);
		} else {
			position = 'absolute';
			left = sceneWidth * sequence.right;
		}

		return { position, left };
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		console.log('click');
		const { metaKey, altKey, shiftKey } = e;
		e.stopPropagation();

		handle.onClickSequence(index, metaKey || altKey, shiftKey);
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		// const { metaKey, altKey, shiftKey } = e;
		// e.stopPropagation();
		// const handleMouseUp = (e: MouseEvent) => {
		// 	if (!isDrag) {
		// 		handle.onClickSequence(index, metaKey || altKey, shiftKey);
		// 	}
		// 	console.log('mosue up!');
		// };
		// let isDrag = false;
		// const handleMouseMove = (e: MouseEvent) => {
		// 	console.log('move');
		// 	if (!isDrag) {
		// 		isDrag = true;
		// 		if (!sequence.selected) {
		// 			handle.onClickSequence(index, metaKey || altKey, shiftKey);
		// 		}
		// 		window.removeEventListener('mousemove', handleMouseMove);
		// 		window.removeEventListener('mouseup', handleMouseUp);
		// 	}
		// 	// onDragSequence(e);
		// };
		// window.addEventListener('mousemove', handleMouseMove);
		// window.addEventListener('mouseup', handleMouseUp);
	};

	const handleDragStart = (e: any) => {
		const { metaKey, altKey, shiftKey } = e;
		if (!sequence.selected) {
			handle.onClickSequence(index, metaKey || altKey, shiftKey);
		}
		handle.dragStart();
	};

	const handleDragEnd = () => {
		handle.dragEnd();
	};

	return (
		<React.Fragment>
			<div
				className="sequence-content-wrap"
				style={{
					display: 'flex',
					position: 'absolute',
					left: sceneWidth * sequence.left,
					width: sceneWidth * (sequence.right - sequence.left),
					height: sequenceHeight - 4,
					alignItems: 'center',
					borderRadius: '4px',
					boxShadow: 'rgb(15 15 15 / 10%) 0px 0px 0px 1px inset, rgb(15 15 15 / 10%) 0px 1px 2px',
					background: sequence.selected ? '#ff625a' : undefined
				}}
			>
				<div
					className="sequence-content"
					style={{
						display: 'flex',
						userSelect: 'none',
						cursor: 'pointer',
						width: '100%',
						height: '100%',
						paddingLeft: '8px',
						paddingRight: '8px'
					}}
					draggable
					onClick={handleClick}
					onMouseDown={handleMouseDown}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					onDrop={() => console.log('drop?')}
				/>
				<SequenceItemContentResizeHandler
					{...{ handle, sequence, index, scrollLeft, isLeft: true, onResizeSequence }}
				/>
				<SequenceItemContentResizeHandler
					{...{ handle, sequence, index, scrollLeft, isLeft: false, onResizeSequence }}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					position: 'relative',
					width: '100%',
					height: sequenceHeight - 4,
					WebkitMaskImage: `linear-gradient(90deg, rgb(0, 0, 0) ${sequence.right *
						sceneWidth}px, rgba(0, 0, 0, 0.4) ${sequence.right * sceneWidth}px)`,
					pointerEvents: 'none'
				}}
			>
				<div
					style={{
						...getPositionAndLeft(),
						display: 'flex',
						height: '100%',
						paddingLeft: '8px'
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						{content}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SequenceItemContent;
