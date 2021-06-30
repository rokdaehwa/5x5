import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import CategoryDrawer from 'components/CategoryDrawer';
import { RECOMMENDED_EXERCISES } from 'utils/data';

import { useStyles } from './styles';

function AddExerciseScreen(props) {
	const classes = useStyles();
	const history = useHistory();


	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<Typography>
						<b>추가?</b>
					</Typography>
				</Toolbar>
			</AppBar>

		

			
		</div>
	);
}

export default AddExerciseScreen;