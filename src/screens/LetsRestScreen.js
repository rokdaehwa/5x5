import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import { useInterval } from '../hooks/useInterval';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
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
		display: 'flex',
		alignItems: 'center',
	},
	linearProgress: {
		backgroundColor: theme.palette.common.black + '0a',
	},
	titleContainer: {
		marginTop: theme.spacing(8),
		textAlign: 'center',
	},
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		// alignItems: 'center',
	},
	controlContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	setInfo: {
		height: theme.spacing(8), // 이 수치를 조절해서 화면 표시
		display: 'flex',
		flexDirection: 'column-reverse',
		'& > *': {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
			width: '100vw',
			padding: `${theme.spacing(2)}px 0px`,
			textAlign: 'center',
		},
	},
	spacing: {
		width: theme.spacing(1),
		height: theme.spacing(1),
	},
	iconButton: {
		width: 100,
		height: 100,
	},
}));

function LetsRestScreen(props) {
	const classes = useStyles();
	const history = useHistory();

	const { handleNext, nextSetInfo, progress, flush } = props;
	
	const [ticker, setTicker] = useState(0);
	const [isTicking, setIsTicking] = useState(true);
	
	//https://velog.io/@jakeseo_me/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85%EC%8A%A4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EC%8B%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90#%ED%9B%85-%EB%81%84%EC%A7%91%EC%96%B4%EB%82%B4%EA%B8%B0
	useInterval(
		() => {
			setTicker(ticker + 1);
		},
		isTicking ? 1000 : null
	);
	
	const formatMMSS = (second) => {
		let min =parseInt(second / 60);
		if (min < 10) min = '0' + min;
		let sec = second % 60;
		if (sec < 10) sec = '0' + sec;
		return `${min}:${sec}`
	}

	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<IconButton
						onClick={() => {
							flush();
							history.goBack();
						}}
					>
						<CloseRoundedIcon />
					</IconButton>
					<div className={classes.trailing}>
						<Typography>{`${formatMMSS(ticker)}`}</Typography>
						<IconButton onClick={() => setIsTicking(!isTicking)}>
							{isTicking ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
						</IconButton>
					</div>
				</Toolbar>
				<LinearProgress
					className={classes.linearProgress}
					variant="determinate"
					value={progress * 100}
				/>
			</AppBar>
			<Toolbar />
			<div className={classes.titleContainer}>
				<Typography variant="h5">
					<b>휴식</b>
				</Typography>
				<Typography variant="h6">45초</Typography>
			</div>
			<div className={classes.container}>
				<div className={classes.setInfo}>
					<Typography variant='h6'>
						<b>
							{nextSetInfo === null
								? '종료'
								: `다음: ${nextSetInfo.exerciseName} ${
										nextSetInfo.set === null ? '' : nextSetInfo.set
								  }`}
						</b>
					</Typography>
				</div>
				<div className={classes.controlContainer}>
					<IconButton onClick={handleNext}>
						<CheckCircleRoundedIcon className={classes.iconButton} />
					</IconButton>
				</div>
			</div>
		</div>
	);
}

export default LetsRestScreen;