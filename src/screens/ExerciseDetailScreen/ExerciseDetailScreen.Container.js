import React from 'react';
import {connect} from 'react-redux';
import { addExercise } from 'store/modules/routine';
import ExerciseDetailScreen from './ExerciseDetailScreen';

function ExerciseDetailScreenContainer(props) {
	return <ExerciseDetailScreen {...props} />;
}

const mapStateToProps = (state) => ({
	numExercises: state.routine.length,
});

const mapDispatchToProps = { addExercise };

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDetailScreenContainer);