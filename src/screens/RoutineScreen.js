import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// for Nested DnD - https://codesandbox.io/s/jp4ow4r45v?file=/index.js

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import NativeSelect from '@material-ui/core/NativeSelect';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

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
	exercise: {
		backgroundColor: theme.palette.common.white,
		margin: `${theme.spacing(2)}px 0px`,
	},
	repsContainer: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
	},
	btnSetReps: {
		background: theme.palette.common.black + '2a',
		width: theme.spacing(3),
		height: theme.spacing(3),
		margin: theme.spacing(0.5),
		borderRadius: theme.spacing(0.5),
		'&:disabled': {
			color: theme.palette.common.black + '30',
			background: theme.palette.common.black + '1a',
		},
	},
	btnStartContainer: {
		width: '100vw',
		height: '15vh',
		position: 'fixed',
		left: 0,
		bottom: 0,
		background: 'linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, #FAFAFA 100%)',
	},
	btnStart: {
		width: '75vw',
		position: 'fixed',
		left: '12.5vw',
		bottom: theme.spacing(4),
	},
	fakeListItem: {
		height: 48, // height hard-coded
	},
	dialogInputContainer: {
		display: 'flex',
		padding: `0px ${theme.spacing(2)}px`,
		'& > *': {
			marginRight: theme.spacing(2),
		},
	},
	dialogInput: {
		width: `calc(100vw - ${2 * theme.spacing(2)}px)`,
		border: `0.5px solid ${theme.palette.common.grey}`,
		padding: theme.spacing(1.5),
		boxSizing: 'border-box',
		borderRadius: theme.spacing(0.5),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const reorder = (list, startIndex, endIndex) => {
	let result = list;
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

function RoutineScreen(props) {
	const classes = useStyles();
	const history = useHistory();
	const [toggleEdit, setToggleEdit] = useState(false);
	const [toggleSet, setToggleSet] = useState(false);
	const [selected, setSelected] = useState({
		exerciseKey: null,
		setKey: null,
	});
	const [inputWeight, setInputWeight] = useState();
	const [inputReps, setInputReps] = useState();
	const [inputRepsUnit, setInputRepsUnit] = useState('회');
	const {
		today,
		exercises,
		handleSetReps,
		deleteExercise,
		deleteExerciseSet,
		addExerciseSet,
		updateExerciseSet,
		setExercises,
	} = props;

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const newItems = reorder(exercises, result.source.index, result.destination.index);

		setExercises(newItems);
	};

	return (
		<div>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					{toggleEdit ? null : (
						<IconButton onClick={() => history.goBack()}>
							<CloseIcon />
						</IconButton>
					)}

					<Button
						disabled={!toggleEdit && (toggleEdit || exercises.length === 0)}
						className={classes.trailing}
						onClick={() => setToggleEdit(!toggleEdit)}
						variant={toggleEdit ? 'outlined' : 'text'}
						color={toggleEdit ? 'primary' : 'default'}
						disableElevation
					>
						{toggleEdit ? '완료' : '편집'}
					</Button>
				</Toolbar>
			</AppBar>

			<Toolbar />

			<div className={classes.contentContainer}>
				<div className={classes.titleContainer}>
					<Typography color="textSecondary" gutterBottom>
						<b>{today}</b>
					</Typography>
					<Typography variant="h4">
						<b>루틴</b>
					</Typography>
					<Typography>{`${exercises.length}가지의 운동`}</Typography>
				</div>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<List {...provided.droppableProps} ref={provided.innerRef}>
								{exercises.map((exercise, index) => {
									return (
										<Draggable
											key={exercise.key}
											draggableId={`${exercise.key}`}
											index={index}
											isDragDisabled={!toggleEdit}
										>
											{(provided, snapshot) => (
												<Card
													key={exercise.key}
													className={classes.exercise}
													elevation={snapshot.isDragging ? 4 : 0}
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<ListItem>
														<ListItemText
															primary={exercise.exerciseName}
															primaryTypographyProps={{
																variant: 'h6',
															}}
														/>

														<ListItemSecondaryAction>
															{toggleEdit ? (
																<Button
																	color="secondary"
																	disableElevation
																	variant="contained"
																	onClick={() =>
																		deleteExercise(exercise.key)
																	}
																>
																	운동 삭제
																</Button>
															) : (
																<Typography
																	variant="body2"
																	color="textSecondary"
																>
																	{exercise.exerciseParts.join(
																		', '
																	)}
																</Typography>
															)}
														</ListItemSecondaryAction>
													</ListItem>

													{exercise.exerciseSets.map((set) => {
														return (
															<ListItem
																key={set.key}
																button={!toggleEdit}
																onClick={() => {
																	if (!toggleEdit) {
																		setSelected(() => {
																			return {
																				exerciseKey:
																					exercise.key,
																				setKey: set.key,
																			};
																		});
																		setInputWeight(set.weight);
																		setInputReps(set.reps);
																		setInputRepsUnit(
																			set.repsUnit
																		);
																		setToggleSet(true);
																	}
																}}
															>
																{toggleEdit ? (
																	<ListItemIcon>
																		<ButtonBase
																			onClick={() =>
																				deleteExerciseSet(
																					exercise.key,
																					set.key
																				)
																			}
																		>
																			<RemoveCircleIcon color="error" />
																		</ButtonBase>
																	</ListItemIcon>
																) : null}

																<ListItemText
																	secondary={`${
																		parseInt(set.weight) === 0
																			? '맨몸'
																			: `${set.weight}kg`
																	} ${set.reps}${set.repsUnit}`}
																	secondaryTypographyProps={{
																		color: `${
																			set.setReps <= 0
																				? 'textSecondary'
																				: 'textPrimary'
																		}`,
																	}}
																/>

																{toggleEdit ? null : (
																	<ListItemSecondaryAction
																		className={
																			classes.repsContainer
																		}
																	>
																		<ButtonBase
																			className={
																				classes.btnSetReps
																			}
																			onClick={() =>
																				handleSetReps(
																					'decrement',
																					exercise.key,
																					set.key
																				)
																			}
																			disabled={
																				set.setReps <= 0
																			}
																		>
																			-
																		</ButtonBase>
																		<span>{set.setReps}</span>
																		<ButtonBase
																			className={
																				classes.btnSetReps
																			}
																			onClick={() =>
																				handleSetReps(
																					'increment',
																					exercise.key,
																					set.key
																				)
																			}
																		>
																			+
																		</ButtonBase>
																	</ListItemSecondaryAction>
																)}
															</ListItem>
														);
													})}

													{toggleEdit ? (
														<div className={classes.fakeListItem} />
													) : (
														<ListItem
															button
															onClick={() => {
																setSelected(() => {
																	return {
																		exerciseKey: exercise.key,
																		setKey: null,
																	};
																});
																setInputWeight('');
																setInputReps('');
																setInputRepsUnit('회');
																setToggleSet(true);
															}}
														>
															<ListItemIcon>
																<AddCircleIcon color="primary" />
															</ListItemIcon>
															<ListItemText
																secondary="세트 추가"
																secondaryTypographyProps={{
																	color: 'textPrimary',
																}}
															/>
														</ListItem>
													)}
												</Card>
											)}
										</Draggable>
									);
								})}
							</List>
						)}
					</Droppable>
				</DragDropContext>
			</div>

			<div className={classes.fakeListItem} />
			<div className={classes.fakeListItem} />

			{toggleEdit ? null : (
				<div className={classes.btnStartContainer}>
					<Button
						disabled={exercises.length === 0}
						className={classes.btnStart}
						color="primary"
						variant="contained"
						disableElevation
						component={Link}
						to="/exercise"
					>
						<Typography variant="h6">
							<b>시작하기</b>
						</Typography>
					</Button>
				</div>
			)}

			<Dialog
				fullScreen
				open={toggleSet}
				onClose={() => setToggleSet(false)}
				TransitionComponent={Transition}
			>
				{`${selected.exerciseKey} ${selected.setKey}`}
				<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
					<Toolbar>
						<IconButton onClick={() => setToggleSet(false)}>
							<CloseIcon />
						</IconButton>

						<Button
							className={classes.trailing}
							disableElevation
							disabled={inputWeight === '' || inputReps === ''}
							onClick={() => {
								if (selected.setKey === null) {
									addExerciseSet(selected.exerciseKey, {
										weight: inputWeight,
										reps: inputReps,
										repsUnit: inputRepsUnit,
									});
								} else {
									updateExerciseSet(selected.exerciseKey, selected.setKey, {
										weight: inputWeight,
										reps: inputReps,
										repsUnit: inputRepsUnit,
									});
								}

								setToggleSet(false);
							}}
						>
							완료
						</Button>
					</Toolbar>
					<Toolbar>
						<Typography variant="h5" className={classes.typography}>
							<b>{`${selected.setKey === null ? '세트 추가' : '수정'}`}</b>
						</Typography>
					</Toolbar>
				</AppBar>
				<Toolbar />
				<Toolbar />
				<div className={classes.dialogInputContainer}>
					<InputBase
						className={classes.dialogInput}
						autoFocus
						type="number"
						inputProps={{ inputMode: 'numeric', style: { textAlign: 'right' } }}
						placeholder="00"
						endAdornment={<InputAdornment position="end">kg</InputAdornment>}
						value={inputWeight}
						onChange={(e) => setInputWeight(e.target.value)}
					/>
					<InputBase
						className={classes.dialogInput}
						type="number"
						inputProps={{ inputMode: 'numeric', style: { textAlign: 'right' } }}
						placeholder="00"
						endAdornment={
							<InputAdornment position="end">
								<NativeSelect
									className={classes.dialogSelect}
									value={inputRepsUnit}
									onChange={(e) => setInputRepsUnit(e.target.value)}
								>
									<option value={'회'}>회</option>
									<option value={'분'}>분</option>
									<option value={'초'}>초</option>
								</NativeSelect>
							</InputAdornment>
						}
						value={inputReps}
						onChange={(e) => setInputReps(e.target.value)}
					/>
				</div>
			</Dialog>
		</div>
	);
}

export default RoutineScreen;