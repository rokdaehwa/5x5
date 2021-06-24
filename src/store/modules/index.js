import { combineReducers } from 'redux';
import profile from './profile';

console.log('combine!', profile);

export default combineReducers({
  profile,
});
