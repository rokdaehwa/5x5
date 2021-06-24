import { createAction, handleActions } from 'redux-actions';

const UPDATE_USER_NAME = 'profile/UPDATE_USER_NAME';
const UPDATE_USER_EMAIL = 'profile/UPDATE_USER_EMAIL';

export const updateUserName = createAction(UPDATE_USER_NAME, (text) => text);
export const updateUserEmail = createAction(UPDATE_USER_EMAIL, (text) => text);

const initialState = {
	userName: '',
	userEmail: '',
};

export default handleActions(
	{
		[UPDATE_USER_NAME]: (state, action) => ({
			...state,
			userName: action.payload,
		}),
		[UPDATE_USER_EMAIL]: (state, action) => ({
			...state,
			userEmail: action.payload,
		}),
	},
	initialState
);