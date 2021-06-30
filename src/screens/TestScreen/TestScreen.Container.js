import React from 'react';
import { connect } from 'react-redux';

import { updateUserEmail } from 'store/modules/profile';
import { setDoneOrNot, flush } from 'store/modules/routine';
import TestScreen from './TestScreen';

function TestScreenContainer(props) {
	return <TestScreen {...props} />;
}

const mapStateToProps = (state) => ({
	exercises: state.routine,
});

const mapDispatchToProps = {  };

export default connect(mapStateToProps, mapDispatchToProps)(TestScreenContainer);