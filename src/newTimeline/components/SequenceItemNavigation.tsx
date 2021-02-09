import React from 'react';
import { SequenceModel } from '../models';
import { sequenceHeight, leftWidth } from './const';

interface Props {
	sequence: SequenceModel;
	activeLeft: boolean;
	scrollLeft: number;
	timelineWidth: number;
	sceneWidth: number;
	isLeft: boolean;
	onClickNavigation: (sequence: SequenceModel, isLeft: boolean) => void;
}
const SequenceItemNavigation: React.FC<Props> = ({
	sequence,
	activeLeft,
	scrollLeft,
	timelineWidth,
	sceneWidth,
	isLeft,
	onClickNavigation
}) => {
	const [ isHovered, setIsHovered ] = React.useState(false);
	const width = 220;
	const left = (activeLeft ? leftWidth : 0) + (isLeft ? 0 : timelineWidth - width - (activeLeft ? leftWidth : 0));

	if (isLeft && sequence.left * sceneWidth > scrollLeft) {
		return null;
	}

	if (!isLeft && sequence.right * sceneWidth < scrollLeft + timelineWidth - (activeLeft ? leftWidth : 0)) {
		return null;
	}

	return (
		<div
			className="sequence-item-navigation"
			style={{
				position: 'sticky',
				left,
				width,
				height: sequenceHeight,
				display: 'flex',
				flexDirection: isLeft ? 'row' : 'row-reverse',
				alignItems: 'center',
				cursor: 'pointer',
				pointerEvents: 'none'
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				style={{
					width: '20px',
					height: '20px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'white',
					margin: '0px 8px',
					boxShadow: 'rgb(15 15 15 / 10%) 0px 0px 0px 1px inset, rgb(15 15 15 / 10%) 0px 1px 2px',
					pointerEvents: 'all'
				}}
				onClick={() => onClickNavigation(sequence, isLeft)}
			>
				{isLeft ? ' ' : ' '}
			</div>
			{/* <div
				style={{
					background: 'white',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis'
				}}
			>
				{isHovered && `${sequence.id} adsfasd fasdf af asdf asdf`}
			</div> */}
		</div>
	);
};

export default SequenceItemNavigation;
