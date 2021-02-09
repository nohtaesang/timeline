import React from 'react';
import { SequenceModel, TimelineModel } from './model';
import { sequenceHeight, leftWidth, rulerHeight, headerHeight } from './const';

// const ItemSizeHandle = ({ left, right }: { left?: boolean; right?: boolean }) => {
// 	const ref = React.useRef<HTMLDivElement>(null);
// 	const [ isHovered, setIsHovered ] = React.useState(false);

// 	const getPosition = () => {
// 		if (left) {
// 			return {
// 				left: -3
// 			};
// 		} else {
// 			return {
// 				right: -3
// 			};
// 		}
// 	};

// 	const handleMouseEnter = () => {
// 		setIsHovered(true);
// 	};

// 	const handleMouseLeave = () => {
// 		setIsHovered(false);
// 	};

// 	const handleMouseDown = (e: any) => {
// 		e.stopPropagation();

// 		const handleMouseMove = (e: any) => {};

// 		const handleMouseUp = (e: any) => {
// 			window.removeEventListener('mousemove', handleMouseMove);
// 			window.removeEventListener('mouseup', handleMouseUp);
// 		};

// 		window.addEventListener('mousemove', handleMouseMove);
// 		window.addEventListener('mouseup', handleMouseUp);
// 	};

// 	return (
// 		<div
// 			ref={ref}
// 			style={{
// 				position: 'absolute',
// 				cursor: 'col-resize',
// 				width: 6,
// 				height: '60%',
// 				background: isHovered ? 'black' : 'none',
// 				borderRadius: '4px',
// 				...getPosition()
// 			}}
// 			// draggable
// 			onMouseEnter={handleMouseEnter}
// 			onMouseLeave={handleMouseLeave}
// 			onMouseDown={handleMouseDown}
// 		/>
// 	);
// };

// const Sequence = (props: any) => {
// 	const { sequence, index, sceneWidth } = props;

// 	const handleMouseDown = (e: any) => {
// 		e.stopPropagation();

// 		const handleMouseMove = (e: any) => {};

// 		const handleMouseUp = (e: any) => {
// 			window.removeEventListener('mousemove', handleMouseMove);
// 			window.removeEventListener('mouseup', handleMouseUp);
// 		};

// 		window.addEventListener('mousemove', handleMouseMove);
// 		window.addEventListener('mouseup', handleMouseUp);
// 	};

// 	return (
// 		<div
// 			style={{
// 				position: 'absolute',
// 				left: sequence.left * sceneWidth,
// 				width: (sequence.right - sequence.left) * sceneWidth,
// 				height: '90%',
// 				border: 'solid 1px black',
// 				borderRadius: '4px',
// 				display: 'flex',
// 				alignItems: 'center',
// 				justifyContent: 'center',
// 				cursor: 'move'
// 			}}
// 			onMouseDown={handleMouseDown}
// 		>
// 			<ItemSizeHandle left />
// 			<p>{sequence.id}</p>
// 			<ItemSizeHandle right />
// 		</div>
// 	);
// };

const Dropzone = (props: any) => {
	const { index } = props;
	return (
		<div
			style={{
				width: '100%',
				height: index === -1 ? 0 : sequenceHeight
			}}
		/>
	);
};

const Indicator = (props: any) => {
	const { sequencesLength, currentSceneIndex, sceneWidth } = props;
	return (
		<div
			style={{
				position: 'absolute',
				left: currentSceneIndex * sceneWidth,
				width: sceneWidth,
				height: sequencesLength * sequenceHeight,
				border: 'solid 1px #ff625a'
			}}
		/>
	);
};

const Header = (props: any) => {
	return (
		<div
			style={{
				height: headerHeight
			}}
		/>
	);
};

const Ruler = (props: any) => {
	const { sceneCount, currentSceneIndex, sceneWidth, activeLeft } = props;
	const [ indexes ] = React.useState(new Array(sceneCount).fill(true));

	return (
		<div
			style={{
				height: rulerHeight,
				overflow: 'hidden',
				display: 'flex'
			}}
		>
			{indexes.map((a, index) => (
				<div
					key={index}
					style={{
						position: 'relative',
						width: sceneWidth,
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					{index === currentSceneIndex && (
						<div
							style={{
								position: 'absolute',
								width: 20,
								height: 20,
								borderRadius: '50%',
								background: '#ff625a',
								zIndex: 1
							}}
						/>
					)}
					<div style={{ zIndex: 2 }}>{index + 1}</div>
				</div>
			))}
		</div>
	);
};

const Sequence = (props: any) => {
	const { sequence, sceneWidth, scrollLeft } = props;
	const content = `${sequence.id}, hello my name is taesang. asdf asdf sadf asdf adf asf as fasd f 끝`;

	const [ isSelected, setIsSelected ] = React.useState(sequence.selected);

	const offset = 24;
	const getPositionAndLeft = (): { position: 'absolute' | 'sticky'; left: number } => {
		let position: 'absolute' | 'sticky' = 'absolute',
			left = 0;

		if (sequence.left * sceneWidth > scrollLeft + offset) {
			position = 'absolute';
			left = sceneWidth * sequence.left;
		} else if (sequence.right * sceneWidth > scrollLeft + offset) {
			position = 'sticky';
			left = offset;
		} else {
			position = 'absolute';
			left = sceneWidth * sequence.right;
		}

		return { position, left };
	};

	const hadleClickSequence = () => {
		sequence.onClickSequence(!sequence.selected);
	};

	return (
		<React.Fragment>
			<div
				style={{
					position: 'absolute',
					left: sceneWidth * sequence.left,
					width: sceneWidth * (sequence.right - sequence.left),
					height: sequenceHeight,
					display: 'flex',
					alignItems: 'center',
					borderRadius: '4px',
					boxShadow: 'rgb(15 15 15 / 10%) 0px 0px 0px 1px inset, rgb(15 15 15 / 10%) 0px 1px 2px',
					overflow: 'hidden',
					background: sequence.selected ? '#ff625a' : undefined
				}}
				onClick={hadleClickSequence}
			/>
			<div
				style={{
					...getPositionAndLeft(),
					height: sequenceHeight,
					display: 'flex',
					alignItems: 'center',
					borderRadius: '4px',
					overflow: 'hidden',
					pointerEvents: 'none'
				}}
			>
				<a style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 8 }}>
					{content}
				</a>
			</div>
		</React.Fragment>
	);
};

const Navigation = (props: any) => {
	const { sequence, sceneWidth, activeLeft, timelineWidth, scrollLeft, onClickNavigation, isLeft } = props;
	const [ isHovered, setIsHovered ] = React.useState(false);
	const width = 220;
	const left = (activeLeft ? leftWidth : 0) + isLeft ? 0 : timelineWidth - width;
	console.log(left);
	if (isLeft && sequence.left * sceneWidth > scrollLeft) {
		return null;
	}

	if (!isLeft && sequence.right * sceneWidth < scrollLeft + timelineWidth) {
		return null;
	}

	return (
		<div
			className="sequence-side-info-left"
			style={{
				position: 'sticky',
				left,
				width,
				height: sequenceHeight,
				display: 'flex',
				flexDirection: isLeft ? 'row' : 'row-reverse',
				alignItems: 'center',
				cursor: 'pointer'

				// pointerEvents: 'none'
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
					boxShadow: 'rgb(15 15 15 / 10%) 0px 0px 0px 1px inset, rgb(15 15 15 / 10%) 0px 1px 2px'
				}}
				onClick={onClickNavigation({ sequence, isLeft })}
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

const Row = (props: any) => {
	const { sequence, sceneWidth, timelineWidth, activeLeft, scrollLeft, onClickNavigation } = props;

	return (
		<React.Fragment key={sequence.id}>
			<div className="sequence-side-info" style={{ position: 'relative', height: 0, display: 'flex', zIndex: 2 }}>
				<Navigation
					sequence={sequence}
					sceneWidth={sceneWidth}
					activeLeft={activeLeft}
					timelineWidth={timelineWidth}
					scrollLeft={scrollLeft}
					onClickNavigation={onClickNavigation}
					isLeft
				/>
				<Navigation
					sequence={sequence}
					sceneWidth={sceneWidth}
					activeLeft={activeLeft}
					timelineWidth={timelineWidth}
					scrollLeft={scrollLeft}
					onClickNavigation={onClickNavigation}
				/>
			</div>
			<div
				className="sequence-view"
				style={{
					display: 'flex',
					height: sequenceHeight,
					width: '100%',
					cursor: 'default',
					zIndex: 1,
					WebkitMaskImage: `linear-gradient(90deg, rgb(0, 0, 0) ${sequence.right *
						sceneWidth}px, rgba(0, 0, 0, 0.4) ${sequence.right * sceneWidth}px)`
				}}
			>
				<Sequence sequence={sequence} sceneWidth={sceneWidth} scrollLeft={scrollLeft} />
			</div>
		</React.Fragment>
	);
};

const Timeline = (props: any) => {
	const { timelineModel: { sceneCount, currentSceneIndex, sequences } } = props;

	const timelineRef = React.useRef<HTMLDivElement>(null);
	const scrollRef = React.useRef<HTMLDivElement>(null);
	const [ timelineWidth, setTimelineWidth ] = React.useState(-1);
	const [ sceneWidth, setSceneWidth ] = React.useState(50);
	const [ activeLeft, setActiveLeft ] = React.useState(false);
	const [ scrollLeft, setScrollLeft ] = React.useState(0);
	const [ state, setStaet ] = React.useState('idle');

	React.useEffect(() => {
		const updateSize = () => {
			if (!timelineRef.current) return;
			setTimelineWidth(timelineRef.current.clientWidth);
		};

		updateSize();

		window.addEventListener('resize', updateSize);
		return () => {
			window.removeEventListener('resize', updateSize);
		};
	}, []);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		console.log(e.currentTarget.scrollLeft);
		setScrollLeft(e.currentTarget.scrollLeft);
	};

	const handleClickNavigation = ({ sequence, isLeft }: { sequence: SequenceModel; isLeft: boolean }) => () => {
		if (!timelineRef.current) return;

		const offset = 20;
		let nextScrollLeft = isLeft
			? sequence.left * sceneWidth - offset
			: sequence.right * sceneWidth - timelineWidth + offset;
		timelineRef.current.scrollLeft = nextScrollLeft;
		setScrollLeft(nextScrollLeft);
	};

	// const handleSequenceDragStart = ({sequences, indexes}) =>{

	// }

	return (
		// container
		<div
			ref={timelineRef}
			className="timeline-container"
			style={{
				flex: '1 1 0%',
				overflow: 'auto hidden'
			}}
			onScroll={handleScroll}
		>
			{/* timeline view */}
			<div
				ref={scrollRef}
				className="timeline-view"
				style={{
					position: 'relative',
					float: 'left',
					width: sceneCount * sceneWidth
				}}
			>
				{/* sequences z-index 0 */}
				<div
					className="sequence-container"
					style={{ position: 'absolute', width: '100%', zIndex: 0, top: headerHeight + rulerHeight }}
				>
					{sequences.map((sequence: SequenceModel, index: any) => (
						<Row
							key={sequence.id}
							sequence={sequence}
							index={index}
							sceneWidth={sceneWidth}
							timelineWidth={timelineWidth}
							activeLeft={activeLeft}
							scrollLeft={scrollLeft}
							onClickNavigation={handleClickNavigation}
						/>
					))}
				</div>

				{/* ruler z-index 1 */}
				<div style={{ position: 'absolute', width: '100%', zIndex: 1, top: headerHeight }}>
					<Ruler {...{ sceneCount, currentSceneIndex, sceneWidth, activeLeft }} />
				</div>

				{/* header controller z-index 2 */}
				<div style={{ position: 'sticky', left: 0, height: 0, zIndex: 2 }}>
					<Header {...{ sceneCount, currentSceneIndex, sceneWidth, activeLeft }} />
				</div>

				{/* indicator z-index 3 */}
				<div style={{ position: 'sticky', left: 0, height: 0, zIndex: 3, top: headerHeight + rulerHeight }}>
					<Indicator
						sequencesLength={sequences.length}
						{...{
							currentSceneIndex,
							sceneWidth
						}}
					/>
				</div>
				{/* drop, */}
				<div
					style={{
						// position: 'absolute',
						paddingTop: headerHeight + rulerHeight + 20,
						pointerEvents: 'none'
					}}
				>
					<Dropzone index={-1} />
					{sequences.map((sequence: SequenceModel, index: number) => (
						<Dropzone key={sequence.id} index={index} />
					))}
				</div>

				{/* left, z-index 5 */}
				{activeLeft && (
					<div
						style={{
							position: 'sticky',
							left: 0,
							height: 0,
							width: leftWidth,
							zIndex: 4
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default Timeline;
