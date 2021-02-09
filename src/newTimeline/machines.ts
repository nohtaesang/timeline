import { interpret, assign, createMachine } from 'xstate';
import { TimelineModel } from './models';

export type TimelineMachineContext = {
	timelineModel: TimelineModel | null;
};

export type TimelineMachineEvent =
	| {
			type: 'SET_TIMELINE_MODEL';
			payload: TimelineModel;
		}
	| {
			type: 'DRAG_START';
		}
	| {
			type: 'DRAG_END';
		}
	| {
			type: 'SET_CURRENT_SCENE_INDEX';
			payload: number;
		}
	| {
			type: 'CLICK_SEQUENCE';
			payload: {
				index: number;
				metaKey: boolean;
				shiftKey: boolean;
			};
		}
	| {
			type: 'RESIZE_SEQUENCE';
			payload: {
				index: number;
				value: number;
				isLeft: boolean;
			};
		};

export type StateValue = 'init' | 'idle' | 'drag' | 'error';

export interface TimelineMachineState {
	value: StateValue;
	context: TimelineMachineContext;
}

export const timelineMachine = createMachine<TimelineMachineContext, TimelineMachineEvent, TimelineMachineState>({
	id: 'timelineMachine',
	initial: 'init',
	context: {
		timelineModel: null
	},
	states: {
		init: {
			on: {
				SET_TIMELINE_MODEL: {
					actions: [
						assign((context, event) => {
							return { timelineModel: event.payload };
						})
					],
					target: 'idle'
				}
			}
		},
		idle: {
			on: {
				SET_CURRENT_SCENE_INDEX: {
					actions: [
						(context, event) => {
							if (context.timelineModel) {
								context.timelineModel.setCurrentSceneIndex(event.payload);
							}
						}
					]
				},
				CLICK_SEQUENCE: {
					actions: [
						(context, event) => {
							if (context.timelineModel) {
								const { sequences } = context.timelineModel;
								const { index, metaKey, shiftKey } = event.payload;

								const clickWithMetaKey = () => {
									sequences[index].setSelected(!sequences[index].selected);
								};

								const clickWidthShiftKey = () => {
									let firstIndex = sequences.findIndex((sequence) => sequence.selected);
									let lastIndex = sequences.map((sequence) => sequence.selected).lastIndexOf(true);

									firstIndex = firstIndex < index ? firstIndex : index;
									lastIndex = lastIndex > index ? lastIndex : index;

									if (firstIndex === -1) {
										sequences[index].setSelected(true);
									} else {
										for (let i = firstIndex; i <= lastIndex; i++) {
											sequences[i].setSelected(true);
										}
									}
								};

								const click = () => {
									let otherSelected = false;

									sequences.forEach((sequence, i) => {
										if (sequence.selected && i !== index) {
											otherSelected = true;
											sequence.setSelected(false);
										}
									});

									if (sequences[index].selected && !otherSelected) {
										sequences[index].setSelected(false);
									} else {
										sequences[index].setSelected(true);
									}
								};

								if (metaKey) {
									clickWithMetaKey();
								} else if (shiftKey) {
									clickWidthShiftKey();
								} else {
									click();
								}
							}
						}
					]
				},
				RESIZE_SEQUENCE: {
					actions: [
						(context, event) => {
							if (context.timelineModel) {
								const { index, value, isLeft } = event.payload;
								context.timelineModel.sequences[index].resizeWidth(value, isLeft);
							}
						}
					]
				},
				DRAG_START: {
					actions: [
						(context, event) => {
							if (context.timelineModel) {
								context.timelineModel.sequences.forEach((sequence) => {
									if (sequence.selected) {
										sequence.setDragged(true);
									}
								});
							}
						}
					],
					target: 'drag'
				}
			}
		},
		drag: {
			on: {
				DRAG_END: {
					actions: [
						(context, event) => {
							if (context.timelineModel) {
								context.timelineModel.sequences.forEach((sequence) => {
									if (sequence.selected) {
										sequence.setDragged(false);
									}
								});
							}
						}
					],
					target: 'idle'
				}
			}
		},
		error: {
			type: 'final'
		}
	}
});
