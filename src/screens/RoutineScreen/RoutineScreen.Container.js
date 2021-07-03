import React from 'react';
import { connect } from 'react-redux';
import {
	addExerciseSet,
	deleteExercise,
	reorderExercise,
	deleteExerciseSet,
	updateExerciseSet,
	reorderExerciseSet,
	incrementSetReps,
	decrementSetReps,
} from 'store/modules/routine';
import RoutineScreen from './RoutineScreen';

function RoutineScreenContainer(props) {
	return <RoutineScreen {...props} />;
}

const mapStateToProps = (state) => ({
	exercises: state.routine,
	today: state.profile.today,
});

const mapDispatchToProps = {
	addExerciseSet,
	deleteExercise,
	reorderExercise,
	deleteExerciseSet,
	updateExerciseSet,
	reorderExerciseSet,
	incrementSetReps,
	decrementSetReps,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScreenContainer);