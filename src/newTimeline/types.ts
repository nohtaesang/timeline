export interface Handle {
	// timeline
	setCurrentSceneIndex: (index: number) => void;
	dragStart: () => void;
	dragEnd: () => void;
	// sequence
	onClickSequence: (index: number, metaKey: boolean, shiftKey: boolean) => void;
	resizeSequence: (index: number, value: number, isLeft: boolean) => void;
}
