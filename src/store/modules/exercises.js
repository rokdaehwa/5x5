import { createAction, handleActions } from 'redux-actions';
import {EXERCISE_DATA} from 'utils/data';

const ADD_NEW_EXERCISE = 'exercises/ADD_NEW_EXERCISE';

export const addNewExercise = createAction(ADD_NEW_EXERCISE, (info) => info);

const initialState = EXERCISE_DATA;

export default handleActions({
	[ADD_NEW_EXERCISE]: (state, action) => {
		const info = action.payload;
		const newExercise = {
			key: info.key,
			exerciseName: info.exerciseName,
			exerciseParts: info.exerciseParts,
			my: true,
		}
		return state.concat(newExercise);
	}
}, initialState);