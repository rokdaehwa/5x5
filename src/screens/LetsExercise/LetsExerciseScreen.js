import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import { useInterval } from 'hooks/useInterval';

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
		height: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column-reverse',
		'& > *': {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.common.white,
			width: '100vw',
			padding: `${theme.spacing(2)}px 0px`,
			textAlign: 'center',
		},
	},
	setInfoRest: {
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

function LetsExerciseScreen(props) {
	const classes = useStyles();
	const history = useHistory();

	const [setInfo, setSetInfo] = useState({
		exerciseName: '',
		exerciseParts: [],
	});
	const [ticker, setTicker] = useState(0);
	const [isTicking, setIsTicking] = useState(true);
	const [isRest, setIsRest] = useState(false);

	const { handleNext, getSetInfo, index, numList, setIndex } = props;

	useInterval(
		() => {
			setTicker(ticker + 1);
		},
		isTicking ? 1000 : null
	);

	useEffect(() => {
		const _setInfo = getSetInfo(index);
		setSetInfo(_setInfo);
	}, [index]);

	const formatMMSS = (second) => {
		let min = parseInt(second / 60);
		if (min < 10) min = '0' + min;
		let sec = second % 60;
		if (sec < 10) sec = '0' + sec;
		return `${min}:${sec}`;
	};

	const handleClick = (done) => {
		setTicker(0);
		setIsTicking(true);
		if (isRest) return setIsRest(false);

		handleNext(done);
		setIsRest(true);
		setIndex(index + 1);
	};

	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<IconButton
						onClick={() => {
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
					value={(index / numList) * 100}
					color={isRest ? 'secondary' : 'primary'}
				/>
			</AppBar>
			<Toolbar />
			<div className={classes.titleContainer}>
				<Typography variant="h5">
					<b>{isRest ? '휴식' : setInfo.exerciseName}</b>
				</Typography>
				<Typography variant="h6">
					{isRest ? '45초' : setInfo.exerciseParts.join(', ')}
				</Typography>
			</div>
			<div className={classes.container}>
				{setInfo.set === null ? null : (
					<div className={isRest ? classes.setInfoRest : classes.setInfo}>
						<Typography variant="h6">
							<b>
								{isRest
									? `다음: ${getSetInfo(index).exerciseName} ${
											getSetInfo(index).set
									  }`
									: setInfo.set}
							</b>
						</Typography>
					</div>
				)}
				{isRest ? (
					<div className={classes.controlContainer}>
						<IconButton onClick={() => handleClick(true)}>
							<CheckCircleRoundedIcon
								color={'inherit'}
								className={classes.iconButton}
							/>
						</IconButton>
					</div>
				) : (
					<div className={classes.controlContainer}>
						<IconButton onClick={() => handleClick(false)}>
							<HighlightOffRoundedIcon color="error" className={classes.iconButton} />
						</IconButton>

						<div className={classes.spacing} />
						<IconButton onClick={() => handleClick(true)}>
							<CheckCircleRoundedIcon
								color={'primary'}
								className={classes.iconButton}
							/>
						</IconButton>
					</div>
				)}
			</div>
		</div>
	);
}

export default LetsExerciseScreen;