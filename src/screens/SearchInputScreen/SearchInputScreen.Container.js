import React from 'react';
import { connect } from 'react-redux';
import SearchInputScreen from './SearchInputScreen';

function SearchInputScreenContainer(props) {
	return <SearchInputScreen {...props} />;
}

const mapStateToProps = (state) => ({
	numExercises: state.routine.length,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputScreenContainer);