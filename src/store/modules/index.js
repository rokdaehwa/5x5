import { combineReducers } from 'redux';
import exercises from './exercises';
import profile from './profile';
import routine from './routine';

export default combineReducers({
	exercises,
	profile,
	routine,
});