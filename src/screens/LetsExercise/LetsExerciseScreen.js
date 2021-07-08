/*
	Todo: 
		1. Navigate exercises
			<ButtonBase className={classes.iconButton}>
				<SkipPreviousRoundedIcon className={classes.iconButtonIcon} />
			</ButtonBase>

			<ButtonBase className={classes.iconButton}>
				<SkipNextRoundedIcon className={classes.iconButtonIcon} />
			</ButtonBase>
		2. Edit Exercises
			- Add set
			- Add exercise
*/

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import ShortTextRoundedIcon from '@material-ui/icons/ShortTextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';

import LetsRoutineScreen from './LetsRoutineScreen';

import { useInterval } from 'hooks/useInterval';

const black = '#000000';
const white = '#ffffff';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: black,
		color: white,
	},
	appBar: {
		flexGrow: 1,
		backgroundColor: black,
		color: white,
	},
	trailing: {
		marginLeft: 'auto',
		display: 'flex',
		alignItems: 'center',
	},
	iconButton: {
		padding: theme.spacing(0.5),
		borderRadius: theme.spacing(1),
	},
	iconButtonIcon: {
		width: 40,
		height: 40,
	},
	bottomAppBar: {
		borderTop: '2px solid #ffffff10',
		position: 'fixed',
		top: 'auto',
		bottom: 0,
		backgroundColor: black,
		color: white,
		padding: theme.spacing(0, 2),
	},
	colorWhite: {
		color: white,
	},
	flip: {
		transform: 'scaleX(-1)',
	},
	btnPlayPause: {
		position: 'relative',
		borderRadius: '50%',
	},
	btnIcon: {
		position: 'absolute',
		top: 'auto',
		bottom: 'auto',
		left: 'auto',
		right: 'auto',
		'& > *': {
			width: 200,
			height: 200,
			color: white + 30,
		},
	},
	btnInfo: {
		position: 'absolute',
		top: 'auto',
		bottom: 'auto',
		left: 'auto',
		right: 'auto',
		color: white,
	},
	controlContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		// width: 'calc(100% - 60px)',
	},
	controlIcon: {
		width: 70,
		height: 70,
	},
	failIcon: {
		opacity: 0.5,
	},
	doneIcon: {
		color: theme.palette.success.main,
	},
}));

const Progress = (props) => {
	let newProps = { ...props };
	delete newProps.color;
	const StyledProgress = withStyles((theme) => {
		let color = props.color;
		switch (color) {
			case 'primary':
				color = theme.palette.primary.main;
				break;
			case 'secondary':
				color = theme.palette.secondary.main;
				break;
			case 'warning':
				color = theme.palette.warning.main;
				break;
			default:
		}
		return {
			root: {},
			colorPrimary: {
				// backgroundColor: white + 10,
				color,
			},
			circle: {
				strokeLinecap: 'round',
			},
		};
	})(CircularProgress);

	return <StyledProgress {...newProps} />;
};

function LetsExerciseScreen(props) {
	const classes = useStyles();
	const history = useHistory();
	const size = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	const [setInfo, setSetInfo] = useState({
		exerciseName: '',
		exerciseParts: [],
	});
	const [ticker, setTicker] = useState(0);
	const [isTicking, setIsTicking] = useState(true);
	const [isRest, setIsRest] = useState(false);

	const [openRoutine, setOpenRoutine] = useState(false);

	const { handleNext, getSetInfo, index, setIndex, exercises, keyInfo, flush } = props;

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
		const sign = second < 0 ? '-' : '';
		const _second = Math.abs(second);

		let min = parseInt(_second / 60);
		if (min < 10) min = '0' + min;
		let sec = _second % 60;
		if (sec < 10) sec = '0' + sec;
		return `${sign}${min}:${sec}`;
	};

	const handleClick = (done) => {
		setTicker(0);
		setIsTicking(true);
		if (isRest) return setIsRest(false);

		handleNext(done);
		setIsRest(true);
		setIndex(index + 1);
	};

	const handleRoutineOpen = () => {
		setOpenRoutine(true);
	};

	const handleRoutineClose = () => {
		setOpenRoutine(false);
	};

	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<ButtonBase
						className={classes.iconButton}
						onClick={() => 
							history.goBack()
						}
					>
						<CloseRoundedIcon />
					</ButtonBase>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<ButtonBase className={classes.btnPlayPause} onClick={() => setIsTicking(!isTicking)}>
				<Progress
					size={size.width - 32}
					thickness={0.5}
					variant="determinate"
					value={isRest ? Math.max(0.5, ((60 - ticker) * 100) / 60) : 100}
					color={isRest ? 'warning' : white}
				/>
				<span className={classes.btnIcon}>
					{isTicking ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
				</span>
				<span className={classes.btnInfo}>
					<Typography
						variant="h2"
						color={isRest && ticker > 60 ? 'secondary' : 'inherit'}
					>{`${formatMMSS(isRest ? 60 - ticker : ticker)}`}</Typography>
					<Typography variant="h5">
						<b>{isRest ? '휴식' : setInfo.exerciseName}</b>
					</Typography>
					<Typography>
						{isRest
							? `다음: ${getSetInfo(index).exerciseName} ${getSetInfo(index).set}`
							: setInfo.set}
					</Typography>
				</span>
			</ButtonBase>
			{isRest ? (
				<div className={classes.controlContainer} style={{ width: size.width - 32 }}>
					<div />
					<ButtonBase onClick={() => handleClick(true)} color="inherit">
						<CheckCircleRoundedIcon
							className={classes.controlIcon}
							style={{ width: size.width / 4, height: size.width / 4 }}
						/>
					</ButtonBase>
				</div>
			) : (
				<div className={classes.controlContainer} style={{ width: size.width - 32 }}>
					<ButtonBase onClick={() => handleClick(false)}>
						<HighlightOffRoundedIcon
							color="error"
							className={[classes.controlIcon, classes.failIcon].join(' ')}
							style={{ width: size.width / 4, height: size.width / 4 }}
						/>
					</ButtonBase>

					<div className={classes.spacing} />
					<ButtonBase onClick={() => handleClick(true)}>
						<CheckCircleRoundedIcon
							className={[classes.controlIcon, classes.doneIcon].join(' ')}
							style={{ width: size.width / 4, height: size.width / 4 }}
						/>
					</ButtonBase>
				</div>
			)}

			<AppBar className={classes.bottomAppBar}>
				<Toolbar disableGutters>
					<ButtonBase
						className={[classes.iconButton, classes.trailing].join(' ')}
						onClick={handleRoutineOpen}
					>
						<ShortTextRoundedIcon
							className={[classes.flip, classes.iconButtonIcon].join(' ')}
						/>
					</ButtonBase>
				</Toolbar>
			</AppBar>

			<Dialog open={openRoutine} onClose={handleRoutineClose} fullScreen>
				<LetsRoutineScreen
					exercises={exercises}
					handleClose={handleRoutineClose}
					keyInfo={keyInfo}
				/>
			</Dialog>
		</div>
	);
}

export default LetsExerciseScreen;