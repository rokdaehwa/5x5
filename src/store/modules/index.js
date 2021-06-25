import { combineReducers } from 'redux';
import profile from './profile';
import routine from './routine';

console.log('combine!', profile);

export default combineReducers({
	profile,
	routine,
});