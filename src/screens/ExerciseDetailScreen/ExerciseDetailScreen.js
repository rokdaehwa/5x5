import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import { EXERCISE_DATA } from 'utils/data';

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
	const classes = useStyles();
	const history = useHistory();
	const { key } = useParams();

	const { numExercises, addExercise } = props;

	const exercise = EXERCISE_DATA.find((item) => item.key === key);
	
	return (
		<div>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<IconButton onClick={() => history.goBack()}>
						<CloseOutlinedIcon />
					</IconButton>
					<IconButton className={classes.trailing}>
						<Badge badgeContent={numExercises} color="primary">
							<LocalMallOutlinedIcon />
						</Badge>
					</IconButton>
				</Toolbar>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h5" className={classes.typography}>
						<b>{exercise.exerciseName}</b>
					</Typography>
					<IconButton onClick={() => addExercise(key)}>
						<AddCircleRoundedIcon color="primary" />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Toolbar />
			<div>
				<Typography>{`부위: ${exercise.exerciseParts.join(', ')}`}</Typography>
				<p>...작업 중...</p>
			</div>
		</div>
	);
}

export default ExerciseDetailScreen;