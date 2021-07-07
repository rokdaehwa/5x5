import { createAction, handleActions } from 'redux-actions';
// eslint-disable-next-line
import { MOCK_EXERCISES } from 'utils/data.js';

const ADD_EXERCISE = 'exrecises/ADD_EXERCISE';
const DELETE_EXERCISE = 'exercises/DELETE_EXERCISE';
const REORDER_EXERCISE = 'exercises/REORDER_EXERCISE';

const ADD_EXERCISE_SET = 'exercises/ADD_EXERCISE_SET';
const DELETE_EXERCISE_SET = 'exercises/DELETE_EXERCISE_SET';
const UPDATE_EXERCISE_SET = 'exercises/UPDATE_EXERCISE_SET';
const REORDER_EXERCISE_SET = 'exercises/REORDER_EXERCISE_SET';

const INCREMENT_SET_REPS = 'exercise/INCREMENT_SET_REPS';
const DECREMENT_SET_REPS = 'exercise/DECREMENT_SET_REPS';
const SET_DONE_OR_NOT = 'exercise/SET_DONE_OR_NOT';
const FLUSH = 'exercise/FLUSH';

export const addExercise = createAction(ADD_EXERCISE, (data, key) => ({ data, key }));
export const deleteExercise = createAction(DELETE_EXERCISE, (key) => key);
export const reorderExercise = createAction(REORDER_EXERCISE, (startIndex, endIndex) => ({
	startIndex,
	endIndex,
}));
export const addExerciseSet = createAction(ADD_EXERCISE_SET, (key, info) => ({
	key,
	info,
}));
export const deleteExerciseSet = createAction(DELETE_EXERCISE_SET, (exerciseKey, setKey) => ({
	exerciseKey,
	setKey,
}));
export const updateExerciseSet = createAction(UPDATE_EXERCISE_SET, (exerciseKey, setKey, info) => ({
	exerciseKey,
	setKey,
	info,
}));
export const reorderExerciseSet = createAction(
	REORDER_EXERCISE_SET,
	(exerciseKey, startIndex, endIndex) => ({
		exerciseKey,
		startIndex,
		endIndex,
	})
);
export const incrementSetReps = createAction(INCREMENT_SET_REPS, (exerciseKey, setKey) => ({
	exerciseKey,
	setKey,
}));
export const decrementSetReps = createAction(DECREMENT_SET_REPS, (exerciseKey, setKey) => ({
	exerciseKey,
	setKey,
}));
export const setDoneOrNot = createAction(
	SET_DONE_OR_NOT,
	(exerciseKey, setKey, setRepsIndex, info) => ({
		exerciseKey,
		setKey,
		setRepsIndex,
		info,
	})
);
export const flush = createAction(FLUSH);

// const initialState = MOCK_EXERCISES;
const initialState = [];

export default handleActions(
	{
		[ADD_EXERCISE]: (state, action) => {
			if (action.payload === null) return state;
			const newExercise = action.payload.data.find((item) => item.key === action.payload.key);
			if (newExercise === undefined) return state; // no such item
			const newExerciseItem = {
				created: Date(),
				key: Date.now().toString(),
				exerciseName: newExercise.exerciseName,
				exerciseParts: newExercise.exerciseParts,
				exerciseSets: [],
				done: null,
				finished: null,
				my: newExercise.my
			};
			return state.concat(newExerciseItem);
		},
		[DELETE_EXERCISE]: (state, action) => {
			if (action.payload === null) return state;
			return state.filter((item) => item.key !== action.payload);
		},
		[REORDER_EXERCISE]: (state, action) => {
			let result = [...state];
			const [removed] = result.splice(action.payload.startIndex, 1);
			result.splice(action.payload.endIndex, 0, removed);
			return result;
		},
		[ADD_EXERCISE_SET]: (state, action) => {
			const key = action.payload.key;
			const info = action.payload.info;
			if (key === null || info === null) return state;
			const setInfo = {
				...info,
				created: Date(),
				updated: Date(),
				key: Date.now().toString(),
				setReps: 1,
				done: [],
				finished: [],
			};
			return state.map((item) =>
				item.key === key
					? { ...item, exerciseSets: item.exerciseSets.concat(setInfo) }
					: item
			);
		},
		[DELETE_EXERCISE_SET]: (state, action) => {
			const exerciseKey = action.payload.exerciseKey;
			const setKey = action.payload.setKey;
			if (exerciseKey === null || setKey === null) return state;
			return state.map((item) =>
				item.key === exerciseKey
					? {
							...item,
							exerciseSets: item.exerciseSets.filter((set) => set.key !== setKey),
					  }
					: item
			);
		},
		[UPDATE_EXERCISE_SET]: (state, action) => {
			const exerciseKey = action.payload.exerciseKey;
			const setKey = action.payload.setKey;
			const info = action.payload.info;
			if (exerciseKey === null || setKey === null || info === null) return state;
			return state.map((item) =>
				item.key === exerciseKey
					? {
							...item,
							exerciseSets: item.exerciseSets.map((set) =>
								set.key === setKey
									? {
											...set,
											weight: info.weight,
											reps: info.reps,
											repsUnit: info.repsUnit,
									  }
									: set
							),
					  }
					: item
			);
		},
		[REORDER_EXERCISE_SET]: (state, action) => {
			const exerciseKey = action.payload.exerciseKey;
			const startIndex = action.payload.startIndex;
			const endIndex = action.payload.endIndex;

			const newItems = [...state];
			const exercise = state.find((item) => item.key === exerciseKey);
			let exerciseSets = [...exercise.exerciseSets];

			const [removed] = exerciseSets.splice(startIndex, 1);
			exerciseSets.splice(endIndex, 0, removed);

			return newItems.map((item) =>
				item.key === exerciseKey
					? {
							...item,
							exerciseSets,
					  }
					: item
			);
		},
		[INCREMENT_SET_REPS]: (state, action) => {
			const exerciseKey = action.payload.exerciseKey;
			const setKey = action.payload.setKey;
			if (exerciseKey === null || setKey === null) return state;

			return state.map((item) =>
				item.key === exerciseKey
					? {
							...item,
							exerciseSets: item.exerciseSets.map((set) =>
								set.key === setKey
									? {
											...set,
											setReps: set.setReps + 1,
									  }
									: set
							),
					  }
					: item
			);
		},
		[DECREMENT_SET_REPS]: (state, action) => {
			const exerciseKey = action.payload.exerciseKey;
			const setKey = action.payload.setKey;
			if (exerciseKey === null || setKey === null) return state;

			return state.map((item) =>
				item.key === exerciseKey
					? {
							...item,
							exerciseSets: item.exerciseSets.map((set) =>
								set.key === setKey
									? {
											...set,
											setReps: set.setReps - 1,
									  }
									: set
							),
					  }
					: item
			);
		},
		[SET_DONE_OR_NOT]: (state, action) => {
			const exerciseKey = action.payload.exerciseKey;
			const setKey = action.payload.setKey;
			const setRepsIndex = action.payload.setRepsIndex;
			const info = action.payload.info;
			if (exerciseKey === null || info === null) return;
			let tmpExercises = [...state];
			const exerciseIndex = tmpExercises.findIndex((item) => item.key === exerciseKey);
			let tmpExercise = tmpExercises[exerciseIndex];
			if (setKey === null || setRepsIndex === null) {
				tmpExercise.done = info.done;
				tmpExercise.finished = info.finished;
				return tmpExercises;
			}
			const setIndex = tmpExercise.exerciseSets.findIndex((item) => item.key === setKey);
			tmpExercise.exerciseSets[setIndex].done.push(info.done);
			tmpExercise.exerciseSets[setIndex].finished.push(info.finished);
			return tmpExercises;
		},
		[FLUSH]: (state, action) => state.map((item) => {
			item.done = null;
			item.finished = null;
			item.exerciseSets = item.exerciseSets.map((set) => ({
				...set,
				done: [],
				finished: [],
			}))
			console.log('flush!@', item);
			return item;
		}),
	},
	initialState
);