import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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

import { CATEGORIES, toExerciseName, getExercisesByName } from '../utils/data.js';

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
	card: {
		borderRadius: theme.spacing(4),
		backgroundColor: theme.palette.common.black + '0a',
	},
	space: {
		width: '100%',
		paddingTop: '50%',
	},
	drawerItem: {
		color: theme.palette.common.white,
	},
	drawerPaper: {
		backgroundColor: theme.palette.common.black,
	},
	drawerContent: {
		width: '70vw',
		color: theme.palette.common.white,
		'& > *': {
			margin: theme.spacing(2),
		},
	},
}));

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
			<Drawer
				open={navOpen}
				anchor="right"
				classes={{ paper: classes.drawerPaper }}
				onClose={() => setNavOpen(false)}
			>
				<Toolbar />
				<Toolbar className={classes.trailing}>
					<IconButton onClick={() => setNavOpen(false)}>
						<CloseOutlinedIcon className={classes.drawerItem} />
					</IconButton>
				</Toolbar>
				<div className={classes.drawerContent}>
					{CATEGORIES.map((item) => {
						return (
							<div key={item.key}>
								<Link
									to={`/category/${item.to}`}
									style={{ textDecoration: 'none' }}
								>
									<Typography className={classes.drawerItem} variant="h6">
										{item.name}
									</Typography>
								</Link>
							</div>
						);
					})}
				</div>
			</Drawer>
		</div>
	);
}

export default CategoryDetailScreen;