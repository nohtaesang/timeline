import React from 'react';

export class CounterModel {
	count: number;

	constructor(count: number) {
		this.count = count;
	}
	increaseCount() {
		this.count++;
	}
}

export interface Handle {
	increase: () => void;
}

interface CounterProps {
	onReady: (handle: Handle) => void;
	model: CounterModel;
}

export abstract class Counter extends React.Component<CounterProps> {
	handle: Handle;

	constructor(props: CounterProps) {
		super(props);
		this.handle = { increase: () => this.props.model.increaseCount() };
		this.props.onReady(this.handle);
	}

	increase() {
		console.log('helloo');
		this.handle.increase();
	}

	render() {
		return this.props.model.count;
	}
}
