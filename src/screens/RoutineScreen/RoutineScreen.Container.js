import React from 'react';
import { connect } from 'react-redux';
import {
	addExerciseSet,
	deleteExercise,
	deleteExerciseSet,
	updateExerciseSet,
	incrementSetReps,
	decrementSetReps,
	setDoneOrNot
} from 'store/modules/routine';
import RoutineScreen from './RoutineScreen';

function RoutineScreenContainer(props) {
	return <RoutineScreen {...props} />;
}

const mapStateToProps = (state) => ({
	exercises: state.routine,
});

const mapDispatchToProps = {
	addExerciseSet,
	deleteExercise,
	deleteExerciseSet,
	updateExerciseSet,
	incrementSetReps,
	decrementSetReps,
	setDoneOrNot
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScreenContainer);