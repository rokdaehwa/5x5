import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';

import logoImage from 'assets/logo.png';

import { useStyles } from './styles';

function LandingScreen(props) {
	const classes = useStyles();
	const { userName, updateUserName } = props;

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
					value={userName}
					onChange={(e) =>
						updateUserName(e.target.value)
					}
				/>
				<Button
					className={classes.btnStart}
					color="primary"
					variant="contained"
					disableElevation
					disabled={userName.length < 2}
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