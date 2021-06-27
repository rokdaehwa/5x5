import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import { EXERCISE_DATA } from 'utils/data';

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
}));

function SearchInputScreen(props) {
	const { numExercises } = props;
	const [searchInput, setSearchInput] = useState('');
	const classes = useStyles();
	const history = useHistory();
	const inputRef = React.useRef();

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const resetInput = () => {
		inputRef.current.focus();
		setSearchInput('');
	};

	const exerciseFilter = (item) => {
		const input = searchInput.replace(/\s/g, '');
		if (input === '') return item;
		if (item.exerciseName.replace(/\s/g, '').includes(input)) return item;
		if (item.exerciseParts.join('').includes(input)) return item;
	};

	return (
		<div>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<IconButton onClick={() => history.goBack()}>
						<ArrowBackIosOutlinedIcon />
					</IconButton>
					<form action={`/test-rokdaehwa/${searchInput}/`}>
						<InputBase
							inputRef={inputRef}
							placeholder="운동 이름, 부위 입력"
							inputProps={{ 'aria-label': 'search' }}
							value={searchInput}
							type="text"
							endAdornment={
								<InputAdornment>
									<IconButton onClick={resetInput}>
										<CancelIcon />
									</IconButton>
								</InputAdornment>
							}
							autoFocus
							onChange={handleChange}
						/>
					</form>
					<IconButton>
						<Badge badgeContent={numExercises} color="primary">
							<LocalMallOutlinedIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>

			<Toolbar />

			<List>
				{EXERCISE_DATA.filter(exerciseFilter).map((item) => {
					return (
						<ListItem key={item.key} button>
							<ListItemText
								primary={item.exerciseName}
								secondary={item.exerciseParts.join(', ')}
							/>
							<ListItemSecondaryAction>
								<ChevronRightRoundedIcon />
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}

export default SearchInputScreen;