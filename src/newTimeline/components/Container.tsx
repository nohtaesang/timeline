import React from 'react';
import { TimelineModel, SequenceModel } from '../models';
import { Handle } from '../types';
import { headerHeight, rulerHeight, sequenceHeight, leftWidth } from './const';
import SequenceList from './SequenceList';
import Ruler from './Ruler';
import DropBar from './DropBar';
import { StateValue } from '../machines';
import Header from './Header';
import Indicator from './Indicator';
import Left from './Left';

interface Props {
	state: StateValue;
	timelineModel: TimelineModel;
	handle: Handle;
}

// todo
//
const Container: React.FC<Props> = ({ state, timelineModel, handle }) => {
	const { sceneCount, sequences, currentSceneIndex } = timelineModel;
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollRef = React.useRef<HTMLDivElement>(null);
	const [ activeLeft, setActiveLeft ] = React.useState(false);
	const [ scrollLeft, setScrollLeft ] = React.useState(0);
	const [ timelineWidth, setTimelineWidth ] = React.useState(-1);
	const [ sceneWidth, setSceneWidth ] = React.useState(50);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		setScrollLeft(e.currentTarget.scrollLeft);
	};

	const handleClickNavigation = (sequence: SequenceModel, isLeft: boolean) => {
		if (!containerRef.current) return;

		const offset = 20;
		let nextScrollLeft = isLeft
			? sequence.left * sceneWidth - offset
			: sequence.right * sceneWidth - timelineWidth + offset + (activeLeft ? leftWidth : 0);
		containerRef.current.scrollLeft = nextScrollLeft;
		setScrollLeft(nextScrollLeft);
	};

	const handleResizeSequence = (event: any, index: number, isLeft: boolean) => {
		if (!containerRef.current) return;

		const { offsetLeft, scrollLeft } = containerRef.current;
		const mousePosInTimeline = scrollLeft + event.clientX - offsetLeft;
		const sceneIndex = Math.round(mousePosInTimeline / sceneWidth);

		handle.resizeSequence(index, sceneIndex, isLeft);
	};

	const handleDragSequence = (event: any) => {
		console.log(event);
	};

	const toggleLeft = () => {
		setActiveLeft(!activeLeft);
	};

	React.useEffect(() => {
		const updateSize = () => {
			if (!containerRef.current) return;
			setTimelineWidth(containerRef.current.clientWidth);
		};

		updateSize();

		window.addEventListener('resize', updateSize);
		return () => {
			window.removeEventListener('resize', updateSize);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="timeline-container"
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				overflow: 'scroll',
				userSelect: 'none',
				border: 'solid 1px black'
			}}
			onScroll={handleScroll}
		>
			{activeLeft && (
				<div
					className="timeline-left"
					style={{
						position: 'sticky',
						minWidth: leftWidth,
						height: headerHeight + rulerHeight + sequences.length * sequenceHeight,
						minHeight: '100%',
						left: 0,
						zIndex: 4,
						background: 'white',
						borderRight: 'solid 1px black'
					}}
				>
					<Left />
				</div>
			)}

			<div
				ref={scrollRef}
				className="timeline-view"
				style={{
					position: 'relative',
					width: sceneCount * sceneWidth
				}}
			>
				{/* header controller z-index 3 */}
				<div
					style={{
						position: 'sticky',
						width: timelineWidth - (activeLeft ? leftWidth : 0),
						height: headerHeight,
						top: 0,
						left: activeLeft ? leftWidth : 0,
						zIndex: 3
					}}
				>
					<Header {...{ toggleLeft }} />
				</div>

				{/* ruler z-index 2 */}
				<div
					style={{
						position: 'sticky',
						height: rulerHeight,
						top: headerHeight,
						zIndex: 2
					}}
				>
					<Ruler {...{ sceneCount, currentSceneIndex, activeLeft, sceneWidth }} />
				</div>

				{/* sequences z-index 0 */}
				<div
					className="sequences-container"
					style={{
						position: 'relative',
						width: '100%',
						zIndex: 0
					}}
				>
					<SequenceList
						{...{ state, handle, sequences, activeLeft, scrollLeft, timelineWidth, sceneWidth }}
						onClickNavigation={handleClickNavigation}
						onResizeSequence={handleResizeSequence}
						onDragSequence={handleDragSequence}
					/>
				</div>

				{/* indicator z-index 1 */}
				<div
					style={{
						position: 'absolute',
						height: sequences.length * sequenceHeight,
						left: 0,
						zIndex: 1,
						top: headerHeight + rulerHeight
					}}
				>
					<Indicator {...{ currentSceneIndex, sceneWidth }} />
				</div>
			</div>
		</div>
	);
};

export default Container;
