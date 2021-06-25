import React from 'react';
import { connect } from 'react-redux';

import { updateUserEmail } from 'store/modules/profile';
import { setDoneOrNot, flush } from 'store/modules/routine';
import LetsExercise from './LetsExercise';

function LetsExerciseContainer(props) {
	return <LetsExercise {...props} />;
}

const mapStateToProps = (state) => ({
	exercises: state.routine,
	userEmail: state.profile.userEmail,
});

const mapDispatchToProps = { setDoneOrNot, flush, updateUserEmail };

export default connect(mapStateToProps, mapDispatchToProps)(LetsExerciseContainer);