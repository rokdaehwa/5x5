import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		width: '100vw',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	indexContainer: {
		margin: 'auto',
		textAlign: 'center',
		color: theme.palette.common.white,
		'& > *': {
			marginBottom: theme.spacing(2),
		},
	},
}));

function LetsStartScreen(props) {
	const classes = useStyles();

	const { exercises, handleNext, today } = props;

	useEffect(() => {
		setTimeout(handleNext, 2000);
	}, []);

	return (
		<div className={classes.root}>
			<div className={classes.indexContainer}>
				<Typography>{today}</Typography>
				{exercises.map((item) => {
					return (
						<Typography variant="h5" key={item.key}>
							<b>{item.exerciseName}</b>
						</Typography>
					);
				})}
				<LinearProgress />
			</div>
		</div>
	);
}

export default LetsStartScreen;