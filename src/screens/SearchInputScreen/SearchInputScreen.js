import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import Chip from 'components/Chip';
import AddExerciseScreen from 'screens/AddExerciseScreen';
import * as hangul from 'hangul-js';
import { useStyles } from './styles';

function SearchInputScreen(props) {
	const { addExercise, exerciseData, numExercises } = props;
	const [searchInput, setSearchInput] = useState('');
	const [focused, setFocused] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const [snackbar, setSnackbar] = useState({
		exercise: '',
		open: false,
	});
	const classes = useStyles();
	const history = useHistory();
	const { input } = useParams();
	const inputRef = React.useRef();

	useEffect(() => {
		if (input === undefined) return;
		console.log('useEffect;', input);
		setSearchInput(input);
	}, [input]);

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		history.replace(`/search/${searchInput}`);
		inputRef.current.blur();
	};

	const handleFocus = (e) => {
		setFocused(true);
	};

	const handleBlur = (e) => {
		setFocused(false);
	};

	const resetInput = () => {
		inputRef.current.focus();
		setSearchInput('');
	};
	
	const handleAddOpen = () => {
		setAddOpen(true);
		// setSearchInput('');
	}
	
	const handleAddClose = () => {
		setAddOpen(false);
	}

	const exerciseFilter = (item) => {
		// https://taegon.kim/archives/9919
		// https://github.com/e-/Hangul.js
		// TODO: ??????????????? ??????!
		const _input = searchInput.replace(/\s/g, '');
		const _itemName = item.exerciseName.replace(/\s/g, '');
		if (_input === '') return item;
		if (hangul.search(_itemName, _input) === 0) return item;
		if (hangul.search(item.exerciseParts.join(''), _input) === 0) return item;
		if (_itemName.includes(_input)) return item;
	};
	
	const handleAdd = (key, exerciseName) => () => {
		addExercise(exerciseData, key);
		setSnackbar({
			exercise: exerciseName,
			open: true,
		});
	}
	
	const handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({
			...snackbar,
			open: false,
		});
	};

	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar className={classes.toolbar}>
					<IconButton onClick={() => history.goBack()}>
						<ArrowBackIosOutlinedIcon />
					</IconButton>
					<form onSubmit={handleSubmit} className={classes.form}>
						<InputBase
							autoFocus
							fullWidth
							inputRef={inputRef}
							placeholder="?????? ??????, ?????? ??????"
							inputProps={{ 'aria-label': 'search', spellCheck: false }}
							value={searchInput}
							type="text"
							endAdornment={
								<InputAdornment>
									<IconButton onClick={resetInput}>
										<CancelIcon />
									</IconButton>
								</InputAdornment>
							}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
					</form>
					{focused ? null : (
						<IconButton component={Link} to="/routine">
							<Badge badgeContent={numExercises} color="primary">
								<LocalMallOutlinedIcon />
							</Badge>
						</IconButton>
					)}
				</Toolbar>
			</AppBar>

			<Toolbar />

			<List>
				{exerciseData.filter(exerciseFilter).length === 0 ? (
					<Typography align='center' color='textSecondary'>?????? ????????? ????????????. </Typography>
				) : (
					exerciseData.filter(exerciseFilter).map((item) => {
						return (
							<ListItem key={item.key}>
								<ListItemText primary={
										<div>
											{item.exerciseName + ' '}
											{item.my ? <Chip label='my' size="small"color='warning'/> :null}
										</div>								
									} />
								<ListItemSecondaryAction>
									<IconButton color='primary' onClick={handleAdd(item.key, item.exerciseName)}>
										<AddCircleIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						);
					})
				)}
			</List>
			{searchInput === '' ? null : (
				<Button
					className={classes.btnAdd}
					variant="contained"
					color="primary"
					disableElevation
					onClick={handleAddOpen}
				>
					{`?????? '${searchInput}' ????????????`}
				</Button>
			)}
			<Dialog open={addOpen} onClose={handleAddClose} fullScreen>
				<AddExerciseScreen input={searchInput} handleAddClose={handleAddClose} resetInput={resetInput}/>
			</Dialog>
			<Snackbar
				open={snackbar.open}
				onClose={handleSnackClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				autoHideDuration={2000}
			>
				<div className={classes.snackbar}>{`${snackbar.exercise} ?????????????????????.`}</div>
			</Snackbar>
			
		</div>
	);
}

export default SearchInputScreen;