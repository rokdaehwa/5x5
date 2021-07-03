import React, { useState } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

import { CATEGORIES } from 'utils/data';
import { useStyles } from './styles';

function AddExerciseScreen(props) {
	const classes = useStyles();

	const { input, handleAddClose, addExercise, addNewExercise, resetInput } = props;

	const [info, setInfo] = useState({
		exerciseName: input,
		exerciseParts: [],
	});
	
	const handleAdd = () => {
		const key = Date.now().toString();
		const item = {
			key, 
			...info,
			my: true,
		};
		addNewExercise(item);
		addExercise([item], key);
		resetInput();
		handleAddClose();
	}

	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar className={classes.toolbar}>
					<IconButton onClick={handleAddClose}>
						<CloseIcon />
					</IconButton>
					<Button
						disabled={info.exerciseName === '' || info.exerciseParts.length === 0}
						color="primary"
						variant="contained"
						disableElevation
						onClick={handleAdd}

					>
						<Typography>
							<b>완료</b>
						</Typography>
					</Button>
				</Toolbar>
				<Toolbar>
					<Typography variant="h5">
						<b>운동 추가</b>
					</Typography>
				</Toolbar>
			</AppBar>

			<Toolbar />
			<Toolbar />

			<div className={classes.body}>
				<Typography gutterBottom>
					<b>이름</b>
				</Typography>
				<InputBase
					autoFocus
					className={classes.textField}
					type="text"
					value={info.exerciseName}
					onChange={(e) => setInfo({ ...info, exerciseName: e.target.value })}
				/>
				<div className={classes.space} />
				<Typography gutterBottom>
					<b>부위</b>
				</Typography>
				<Autocomplete
					className={classes.textField}
					multiple
					options={CATEGORIES.map((item) => item.name)}
					freeSolo
					value={info.exerciseParts}
					onChange={(e, value) => setInfo({ ...info, exerciseParts: value })}
					renderTags={(value, getTagProps) => {
						return value.map((option, index) => (
							<Chip variant="outlined" label={option} {...getTagProps({ index })} />
						));
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							fullWidth
							placeholder="추가하려면 엔터"
							
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default AddExerciseScreen;