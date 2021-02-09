import { SequenceModel, TimelineModel } from './models';
import { Handle } from './types';
import { TimelineMachineEvent } from './machines';

export const getSequenceModels = (
	arr: {
		id: string;
		left: number;
		right: number;
		selected?: boolean;
	}[]
) => {
	return arr.map((item) => new SequenceModel(item.id, item.left, item.right, item.selected || false));
};

export const getTimelineModel = (sceneCount: number, currentSceneIndex: number, sequences: SequenceModel[]) => {
	return new TimelineModel(sceneCount, currentSceneIndex, sequences);
};

export const createHandle = (send: (props: TimelineMachineEvent) => any): Handle => ({
	// timeline
	setCurrentSceneIndex: (index) => {
		send({ type: 'SET_CURRENT_SCENE_INDEX', payload: index });
	},
	dragStart: () => {
		send({ type: 'DRAG_START' });
	},
	dragEnd: () => {
		send({ type: 'DRAG_END' });
	},
	// sequence
	onClickSequence: (index, metaKey, shiftKey) => {
		send({ type: 'CLICK_SEQUENCE', payload: { index, metaKey, shiftKey } });
	},
	resizeSequence: (index, value, isLeft) => {
		send({ type: 'RESIZE_SEQUENCE', payload: { index, value, isLeft } });
	}
});
