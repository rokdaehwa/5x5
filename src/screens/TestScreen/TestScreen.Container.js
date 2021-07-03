import React from 'react';
import { connect } from 'react-redux';
import { reorderExercise, reorderExerciseSet } from 'store/modules/routine';
import TestScreen from './TestScreen';

function TestScreenContainer(props) {
	return <TestScreen {...props} />;
}

const mapStateToProps = (state) => ({
	exercises: state.routine,
});

const mapDispatchToProps = { reorderExercise, reorderExerciseSet };

export default connect(mapStateToProps, mapDispatchToProps)(TestScreenContainer);