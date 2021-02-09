import React from 'react';
import { TimelineModel } from './models';
import { timelineMachine, StateValue } from './machines';
import { useMachine } from '@xstate/react';
import { createHandle } from './utils';
import { Handle } from './types';
import Container from './components/Container';

export interface TimelineHandle {
	// timeline
	setCurrentSceneIndex: (index: number) => void;
	// sequence
}

interface Props {
	timelineModel: TimelineModel;
	setHandle: any;
}

export const Timeline: React.FC<Props> = (props) => {
	const [ machine, send ] = useMachine(timelineMachine);
	const [ handle ] = React.useState<Handle>(createHandle(send));

	React.useEffect(() => {
		send({ type: 'SET_TIMELINE_MODEL', payload: props.timelineModel });
		props.setHandle(handle);
		// eslint-disable-next-line
	}, []);

	if (!machine.context.timelineModel) return null;

	return (
		<Container state={machine.value as StateValue} timelineModel={machine.context.timelineModel} handle={handle} />
	);
};
