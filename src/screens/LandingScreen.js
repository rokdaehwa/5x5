import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
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
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,

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

function LandingScreen(props) {
	const classes = useStyles();
	const { userInfo, setUserInfo } = props;

	return (
		<div className={classes.root}>
			<Toolbar className={classes.toolbar}>
				<img src={logoImage} width={36} height={36} alt='logo_5x5'/>
				<div><span className={classes.title}>5x5</span>
				<span>(Beta)</span></div>
			</Toolbar>

			<Toolbar className={classes.space} />

			<div className={classes.catch}>
				<h2 className={classes.catchText}>
					이제는
					<div className={classes.highlight}>기록하면서</div>
					운동할 때.
				</h2>
			</div>

			<div className={classes.btnStartContainer}>
				<Typography variant='body2'>닉네임으로 시작하기(2글자 이상)</Typography>
				<InputBase
					className={classes.inputBase}
					placeholder="마포구 보안관"
					value={userInfo.userName}
					onChange={(e) =>
						setUserInfo((before) => {
							console.log('?', before);
							return {
								...before,
								userName: e.target.value,
							};
						})
					}
				/>
				<Button
					className={classes.btnStart}
					color="primary"
					variant="contained"
					disableElevation
					disabled={userInfo.userName.length < 2}
					component={Link}
					to="/"
				>
					<Typography variant="h6">
						<b>시작하기</b>
					</Typography>
				</Button>
			</div>
		</div>
	);
}

export default LandingScreen;