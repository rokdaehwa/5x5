/*
	Todo: 
		1. Nested Dnd - https://codesandbox.io/s/jp4ow4r45v?file=/index.js
		2. Chip for myExercises
		3. Double check before delete. 

*/

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
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

import { useStyles } from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function RoutineScreen(props) {
	const classes = useStyles();
	const history = useHistory();
	const [toggleEdit, setToggleEdit] = useState(false);
	const [toggleSet, setToggleSet] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
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
		addExerciseSet,
		deleteExercise,
		reorderExercise,
		deleteExerciseSet,
		updateExerciseSet,
		incrementSetReps,
		decrementSetReps,
	} = props;

	const onDragEnd = (result) => {
		setIsDragging(false);

		// dropped outside the list
		if (!result.destination) {
			return;
		}

		reorderExercise(result.source.index, result.destination.index);
	};

	const onDragStart = () => {
		setIsDragging(true);
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
						{toggleEdit ? '완료' : '순서 편집 및 삭제'}
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
				<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
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
															primary={
																<div>
																	{exercise.exerciseName + ' '}
																</div>
															}
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
																				decrementSetReps(
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
																				incrementSetReps(
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
								{provided.placeholder}
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
						inputProps={{ inputMode: 'decimal', style: { textAlign: 'right' } }}
						placeholder="00"
						endAdornment={<InputAdornment position="end">kg</InputAdornment>}
						value={inputWeight}
						onChange={(e) => setInputWeight(e.target.value)}
					/>
					<InputBase
						className={classes.dialogInput}
						type="number"
						inputProps={{ inputMode: 'decimal', style: { textAlign: 'right' } }}
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