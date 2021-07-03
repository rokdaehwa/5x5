import React from 'react';
import { connect } from 'react-redux';
import { addExercise } from 'store/modules/routine';
import HomeScreen from './HomeScreen';

function HomeScreenContainer(props) {
	return <HomeScreen {...props} />;
}

const mapStateToProps = (state) => ({
	userName: state.profile.userName,
	numExercises: state.routine.length,
	exerciseData: state.exercises,
});

const mapDispatchToProps = { addExercise };

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer);