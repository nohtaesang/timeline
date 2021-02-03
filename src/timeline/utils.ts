import { SequenceModel, TimelineModel } from './model';

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
