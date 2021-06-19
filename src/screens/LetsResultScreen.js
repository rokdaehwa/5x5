import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { exportComponentAsPNG } from 'react-component-export-image';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

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
	trailing: {
		marginLeft: 'auto',
	},
	contentContainer: {
		width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
	},
	titleContainer: {
		margin: theme.spacing(2),
		textAlign: 'center',
	},
	exerciseContainer: {
		marginBottom: theme.spacing(4),
	},
	indicationContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		maxWidth: 200, // TODO: Make it responsive, not hard-coded
		'& > *': {
			marginLeft: theme.spacing(0.5),
			marginBottom: theme.spacing(0.5),
		},
	},
	circleTrue: {
		width: theme.spacing(2.5),
		height: theme.spacing(2.5),
		backgroundColor: theme.palette.primary.main,
		borderRadius: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.common.white,
	},
	circleFalse: {
		width: theme.spacing(2.5),
		height: theme.spacing(2.5),
		backgroundColor: theme.palette.error.main,
		borderRadius: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.common.white,
	},
	applyContainer: {
		// TODO: style it!
		padding: theme.spacing(2),
	},
	space: {
		paddingTop: theme.spacing(4),
	},
	inputBase: {
		width: '100%',
		border: `0.5px solid ${theme.palette.common.grey}`,
		padding: theme.spacing(1),
		boxSizing: 'border-box',
		borderRadius: theme.spacing(0.5),
	},
}));

const Circle = (props) => {
	const { done } = props;
	const classes = useStyles();

	return <div className={done ? classes.circleTrue : classes.circleFalse}></div>;
};

const isValidEmail = (email) => {
	const isEmpty = email === '';
	const includesAt = email.includes('@');
	const includesSpace = email.includes(' ');
	const includesDot = email.includes('.');
	return !isEmpty && includesAt && !includesSpace && includesDot;
};

function LetsResultScreen(props) {
	const classes = useStyles();
	const componentRef = useRef();
	const { exercises, flush, today, handleSubmit } = props;
	const [inputApply, setInputApply] = useState('');
	const [applied, setApplied] = useState(false);

	return (
		<div>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<IconButton component={Link} to="/" onClick={flush}>
						<HomeRoundedIcon />
					</IconButton>
					<IconButton
						className={classes.trailing}
						onClick={() => exportComponentAsPNG(componentRef)}
					>
						<GetAppRoundedIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Toolbar />

			<div className={classes.contentContainer} ref={componentRef}>
				<div className={classes.titleContainer}>
					<Typography color="textSecondary" gutterBottom>
						<b>{today}</b>
					</Typography>
					<Typography variant="h4">
						<b>루틴 결과</b>
					</Typography>
					<Typography>{`${exercises.length}가지의 운동`}</Typography>
				</div>

				<List>
					{exercises.map((exercise) => {
						return (
							<div key={exercise.key} className={classes.exerciseContainer}>
								<ListItem key={exercise.exerciseKey}>
									<ListItemText
										primary={exercise.exerciseParts.join(', ')}
										secondary={exercise.exerciseName}
										primaryTypographyProps={{
											color: 'textSecondary',
											variant: 'body2',
										}}
										secondaryTypographyProps={{
											color: 'textPrimary',
											variant: 'h6',
										}}
									/>
									<ListItemSecondaryAction>
										{exercise.exerciseSets.length !== 0 ? null : (
											<Circle done={exercise.done} />
										)}
									</ListItemSecondaryAction>
								</ListItem>
								{exercise.exerciseSets.length !== 0 ? (
									<div>
										{exercise.exerciseSets.map((set) => {
											return (
												<ListItem key={set.key}>
													<ListItemText
														secondary={`${
															parseInt(set.weight) === 0
																? '맨몸'
																: `${set.weight}kg`
														} ${set.reps}${set.repsUnit}`}
														secondaryTypographyProps={{
															color: 'textPrimary',
														}}
													/>
													<ListItemSecondaryAction>
														<div
															className={classes.indicationContainer}
														>
															{set.done.map((v, i) => {
																return (
																	<Circle
																		done={v}
																		index={0}
																		key={i}
																	/>
																);
															})}
														</div>
													</ListItemSecondaryAction>
												</ListItem>
											);
										})}
									</div>
								) : null}
							</div>
						);
					})}
				</List>
			</div>

			<div className={classes.applyContainer}>
				<Divider />
				<div className={classes.space} />
				<Typography gutterBottom>
					<b>3초만에 결과보고서 신청하기</b>
				</Typography>
				<InputBase
					className={classes.inputBase}
					disabled={applied}
					placeholder="이메일"
					type="email"
					value={inputApply}
					onChange={(e) => setInputApply(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								onClick={() => {
									handleSubmit(inputApply);
									setApplied(true);
								}}
								disabled={!isValidEmail(inputApply) || applied}
								color="primary"
							>
								{applied ? <CheckCircleRoundedIcon /> : <SendRoundedIcon />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</div>
		</div>
	);
}

export default LetsResultScreen;