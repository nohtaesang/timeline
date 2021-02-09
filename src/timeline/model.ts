export class SequenceModel {
	id: string;
	left: number;
	right: number;
	selected: boolean = false;

	constructor(id: string, left: number, right: number, selected: boolean = false) {
		this.id = id;
		this.left = left;
		this.right = right;
		this.selected = selected;
	}

	setLeft(left: number) {
		this.left = left;
	}

	setRight(right: number) {
		this.right = right;
	}

	resizeWidth(left: number, right: number) {
		this.left = left;
		this.right = right;
	}

	onClickSequence(selected: boolean) {
		this.selected = selected;
	}
}

export class TimelineModel {
	sceneCount: number;
	currentSceneIndex: number;
	sequences: SequenceModel[];

	constructor(sceneCount: number = 1, currentSceneIndex: number = 0, sequences: SequenceModel[] = []) {
		this.sceneCount = sceneCount;
		this.currentSceneIndex = currentSceneIndex;
		this.sequences = sequences;
	}

	setSequences(sequences: SequenceModel[]) {
		this.sequences = sequences;
	}

	appendSequence({ id, left, right, selected }: SequenceModel) {
		this.sequences.push(new SequenceModel(id, left, right, selected));
	}

	deleteSequencesByIds(ids: string[]) {
		this.sequences = this.sequences.filter((sequence) => !ids.includes(sequence.id));
	}

	deleteSequencesByIndexes(indexes: number[]) {
		this.deleteSequencesByIds(indexes.map((index) => this.sequences[index].id));
	}

	setCurrentSceneIndex(index: number) {
		this.currentSceneIndex = index;
	}

	moveSequencesByIds(fromSequenceIds: string[], toSequenceId: string, to: 'prev' | 'next') {
		const fromSequences: SequenceModel[] = [],
			toSequences: SequenceModel[] = [];

		this.sequences.forEach(
			(sequence) =>
				fromSequenceIds.includes(sequence.id) ? fromSequences.push(sequence) : toSequences.push(sequence)
		);

		const index = toSequences.findIndex((sequence) => sequence.id === toSequenceId);
		if (index !== -1) {
			this.sequences = this.sequences.splice(index + (to === 'prev' ? 0 : 1), 0, ...fromSequences);
		}
	}

	moveSequencesByIndexes(fromSequenceIndexes: number[], toSequenceIndex: number, to: 'prev' | 'next') {
		this.moveSequencesByIds(
			fromSequenceIndexes.map((index) => this.sequences[index].id),
			this.sequences[toSequenceIndex].id,
			to
		);
	}

	getSequencesByIds(ids: string[]) {
		return this.sequences.filter((sequence) => ids.includes(sequence.id));
	}

	getSequencesByIndexes(indexes: number[]) {
		return this.getSequencesByIds(indexes.map((index) => this.sequences[index].id));
	}
}
