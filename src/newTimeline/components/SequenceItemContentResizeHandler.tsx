import React from 'react';
import { SequenceModel } from '../models';
import { sequenceHeight, navigationOffset } from './const';
import { Handle } from '../types';

interface Props {
	handle: Handle;
	sequence: SequenceModel;
	index: number;
	scrollLeft: number;
	isLeft: boolean;
	onResizeSequence: (event: MouseEvent, index: number, isLeft: boolean) => void;
}

const getPos = (isLeft: boolean): { left?: number; right?: number } => {
	return isLeft ? { left: -3 } : { right: -3 };
};
const SequenceItemContentResizeHandler: React.FC<Props> = ({
	handle,
	sequence,
	index,
	scrollLeft,
	isLeft,
	onResizeSequence
}) => {
	const { dragged } = sequence;
	const [ isHoverd, setIsHoverd ] = React.useState(false);
	const [ isDrag, setIsDrag ] = React.useState(false);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setIsDrag(true);

		const handleMouseMove = (e: MouseEvent) => {
			e.stopPropagation();
			console.log('move=-=');
			onResizeSequence(e, index, isLeft);
		};

		const handleMouseUp = (e: MouseEvent) => {
			setIsDrag(false);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	return (
		<div
			className="resize-handler-wrap"
			style={{
				position: 'absolute',
				...getPos(isLeft),
				width: '8px',
				height: '100%',
				display: dragged ? 'none' : 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 1,
				cursor: 'col-resize',
				userSelect: 'all'
			}}
			onMouseEnter={() => setIsHoverd(true)}
			onMouseLeave={() => setIsHoverd(false)}
			onMouseDown={handleMouseDown}
			onClick={(e) => e.stopPropagation()}
			draggable={false}
		>
			{(isHoverd || isDrag) && (
				<div
					style={{
						width: '50%',
						height: '60%',
						background: 'black'
					}}
				/>
			)}
		</div>
	);
};

export default SequenceItemContentResizeHandler;
