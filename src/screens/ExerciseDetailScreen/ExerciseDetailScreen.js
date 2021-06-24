import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	appBar: {
		flexGrow: 1,
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	trailing: {
		marginLeft: 'auto',
	},
}));

function ExerciseDetailScreen(props) {
	const classes=useStyles();
	
	const { exerciseKey, numExercises } = props;

	return (
		<div>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<IconButton className={classes.trailing}>
						<Badge badgeContent={numExercises} color="primary">
							<LocalMallOutlinedIcon />
						</Badge>
					</IconButton>
				</Toolbar>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h5" className={classes.typography}>
						<b>벤치프레스</b>
					</Typography>
					<IconButton>
						<AddCircleRoundedIcon color='primary'/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Toolbar />
			<div>
				<p>아주 죽여주는 운동입니다. </p>
			</div>
		</div>
	);
}

export default ExerciseDetailScreen;