import React from 'react';
import { connect } from 'react-redux';

import { addExercise } from 'store/modules/routine';
import SearchInputScreen from './SearchInputScreen';

function SearchInputScreenContainer(props) {
	return <SearchInputScreen {...props} />;
}

const mapStateToProps = (state) => ({
	numExercises: state.routine.length,
	exerciseData: state.exercises,
});

const mapDispatchToProps = { addExercise };

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputScreenContainer);