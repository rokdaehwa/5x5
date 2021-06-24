import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	container: {
		margin: 'auto',
		textAlign: 'center',
		color: theme.palette.common.white,
		'& > *': {
			marginBottom: theme.spacing(2),
		},
	},
	doneIcon: {
		width: 100,
		height: 100,
	}
}));

function LetsEndScreen(props) {
	const classes = useStyles();
	
	useEffect(() => {
		setTimeout(handleNext, 2000);
	}, [])
	
	const {handleNext} = props;

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<DoneIcon className={classes.doneIcon} color='primary'/>
				<LinearProgress />
			</div>
		</div>
	);
}

export default LetsEndScreen;