import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import * as hangul from 'hangul-js';
import { EXERCISE_DATA } from 'utils/data';
import { useStyles } from './styles';

function SearchInputScreen(props) {
	const { numExercises } = props;
	const [searchInput, setSearchInput] = useState('');
	const [focused, setFocused] = useState(false);
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
		console.log('focus');
		setFocused(true);
	};

	const handleBlur = (e) => {
		console.log('blur');
		setFocused(false);
	};

	const resetInput = () => {
		inputRef.current.focus();
		setSearchInput('');
	};

	const exerciseFilter = (item) => {
		// https://taegon.kim/archives/9919
		// https://github.com/e-/Hangul.js
		// TODO: 초성으로도 검색!
		const _input = searchInput.replace(/\s/g, '');
		if (_input === '') return item;
		if (hangul.search(item.exerciseName.replace(/\s/g, ''), _input) === 0) return item;
		if (hangul.search(item.exerciseParts.join(''), _input) === 0) return item;
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
							placeholder="운동 이름, 부위 입력"
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
				{EXERCISE_DATA.filter(exerciseFilter).length === 0 ? (
					<h1> </h1>
				) : (
					EXERCISE_DATA.filter(exerciseFilter).map((item) => {
						return (
							<ListItem key={item.key} button component={Link} to={`/detail/${item.key}`}>
								<ListItemText primary={item.exerciseName} />
								<ListItemSecondaryAction>
									<Typography variant="body2" color="textSecondary">
										{item.exerciseParts.join(', ')}
									</Typography>
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
					onClick={() => alert('곧 업데이트됩니다!')}
				>
					{`직접 '${searchInput}' 추가하기`}
				</Button>
			)}
		</div>
	);
}

export default SearchInputScreen;