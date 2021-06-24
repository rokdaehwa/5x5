import React from 'react';
import { connect } from 'react-redux';
import { updateUserName } from 'store/modules/profile';
import LandingScreen from './LandingScreen';

function LandingScreenContainer(props) {
	return <LandingScreen {...props} />;
}

const mapStateToProps = (state) => ({
	userName: state.profile.userName,
});

const mapDispatchToProps = { updateUserName };

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreenContainer);