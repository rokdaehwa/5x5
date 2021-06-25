import React from 'react';
import { connect } from 'react-redux';
import { addExercise } from 'store/modules/routine';
import CategoryDetailScreen from './CategoryDetailScreen';

function CategoryDetailScreenContainer(props) {
	return <CategoryDetailScreen {...props} />;
}

const mapStateToProps = (state) => ({
	numExercises: state.routine.length,
});

const mapDispatchToProps = { addExercise };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailScreenContainer);