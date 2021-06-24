import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import CategoryDrawer from 'components/CategoryDrawer';
import { CATEGORIES, toExerciseName, getExercisesByName } from 'utils/data.js';

import { useStyles } from './styles';

const Container = styled.div`
	display: grid;
	padding: 24px;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 24px;
	gap: 24px;
`;

function CategoryDetailScreen(props) {
	const classes = useStyles();
	const { to } = useParams();
	const [navOpen, setNavOpen] = useState(false);
	const { addExercise, numExercises } = props;

	const name = toExerciseName(to);
	const exercises = getExercisesByName(name);

	return (
		<div>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<IconButton component={Link} to="/">
						<ArrowBackIosOutlinedIcon />
					</IconButton>
					<div className={classes.trailing}>
						<IconButton>
							<SearchOutlinedIcon />
						</IconButton>
						<IconButton component={Link} to="/routine">
							<Badge badgeContent={numExercises} color="primary">
								<LocalMallOutlinedIcon />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h5" className={classes.typography}>
						<b>{name}</b>
					</Typography>
					<IconButton onClick={() => setNavOpen(true)}>
						<CategoryOutlinedIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Toolbar />
			<Toolbar />

			<Container>
				{exercises.map((exercise) => {
					return (
						<Card key={exercise.key} elevation={0} className={classes.card}>
							<CardHeader
								action={
									<IconButton
										color="primary"
										onClick={() => addExercise(exercise.key)}
									>
										<AddCircleIcon />
									</IconButton>
								}
							/>
							<div className={classes.space}></div>
							<CardContent>
								<Typography>
									<b>{exercise.exerciseName}</b>
								</Typography>
							</CardContent>
						</Card>
					);
				})}
			</Container>
			<CategoryDrawer open={navOpen} setOpen={setNavOpen} />
		</div>
	);
}

export default CategoryDetailScreen;