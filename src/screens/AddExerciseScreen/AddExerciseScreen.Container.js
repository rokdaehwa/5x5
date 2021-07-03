import React from 'react';
import { connect } from 'react-redux';

import { addExercise } from 'store/modules/routine';
import { addNewExercise } from 'store/modules/exercises';
import AddExerciseScreen from './AddExerciseScreen';

function AddExerciseScreenContainer(props) {
	return <AddExerciseScreen {...props} />;
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = { addExercise, addNewExercise };

export default connect(mapStateToProps, mapDispatchToProps)(AddExerciseScreenContainer);