import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import logoImage from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '100vh',
	},
	appBar: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
	},
	toolbar: {
		width: '100%',
		height: 72,
		display: 'flex',
		alignItems: 'center',
		position: 'fixed',
	},
	space: {
		height: 72,
	},
	title: {
		marginLeft: 8,
		fontSize: 28,
		fontWeight: 900,
	},
	catch: {
		margin: 'auto',
		width: '100%',
		textAlign: 'center',
	},
	catchText: {
		fontWeight: 900,
		fontSize: 28,
	},
	btnStartContainer: {
		width: '100vw',
		marginBottom: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
	},
	highlight: {
		// display: 'inline-block',
		position: 'relative',

		'&:before': {
			width: '100%',
			content: '',
			height: 10,
			display: 'inline-block',
			background: '#D9FCDB',
			position: 'absolute',
			bottom: 0,
			left: 0,
			zIndex: -1,
			transition: '0.2s all',
		},
	},
	inputBase: {
		border: `0.5px solid ${theme.palette.common.grey}`,
		padding: theme.spacing(1),
		boxSizing: 'border-box',
		borderRadius: theme.spacing(0.5),
		marginBottom: theme.spacing(1),
	},
}));

function NotFoundScreen() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Toolbar className={classes.toolbar}>
				<img src={logoImage} width={36} height={36} alt='logo_5x5'/>
				<span className={classes.title}>5x5</span>
			</Toolbar>
			<Toolbar />
			<div>
				<h2>
					<mark>404 Page Not Found</mark>
				</h2>
				<h1>여길..어떻게 들어오셨죠?</h1>
			</div>
			<div className={classes.btnStartContainer}>
				<Button
					className={classes.btnStart}
					color="primary"
					variant="contained"
					disableElevation
					component={Link}
					to="/"
				>
					<Typography variant="h6">
						<b>홈으로</b>
					</Typography>
				</Button>
			</div>
		</div>
	);
}

export default NotFoundScreen;