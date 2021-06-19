import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import { CATEGORIES, RECOMMENDED_EXERCISES } from '../utils/data.js';

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
		alignItems: 'center',
	},
	trailing: {
		marginLeft: 'auto',
	},
	typography: {
		' -webkit-font-smoothing': 'antialiased',
	},
	textField: {
		width: `calc(100vw - ${2 * theme.spacing(2)}px)`,
		border: `0.5px solid ${theme.palette.common.grey}`,
		color: theme.palette.common.grey,
		padding: theme.spacing(1.5),
		boxSizing: 'border-box',
		borderRadius: theme.spacing(0.5),
		fontWeight: 300,
	},
	left: {
		width: '100%',
		paddingLeft: theme.spacing(2),
	},
	recommendedContainer: {
		flex: 1,
		display: 'flex',
		flexWrap: 'nowrap',
		overflow: 'scroll',
		width: '100vw',
		paddingLeft: theme.spacing(2),
		marginTop: theme.spacing(4),
		marginLeft: theme.spacing(2),
	},

	recommendedCard: {
		width: '60vw',
		marginRight: theme.spacing(4),
		height: '100vw',
		flex: 'none',
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
			margin: `${theme.spacing(2)}px 0px`,
			padding: `0px ${theme.spacing(2)}px`,
		},
	},
	divider: {
		width: 'calc(70vw - 16)',
		height: 1,
		backgroundColor: theme.palette.common.white + '50',
	},
	greetings: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: theme.palette.common.white + '11',
		cursor: 'pointer',
		'& > *': {
			color: theme.palette.common.white,
		},
	},
}));

function HomeScreen(props) {
	const classes = useStyles();
	const { numExercises, addExercise, userName } = props;
	const [navOpen, setNavOpen] = useState(false);
	// TODO: exercise.length 따라서 hint text 바꿔보자
	const title = '반갑습니다!';
	const hint = '어떤 운동으로 시작해볼까요?';
	
	console.log('home!', userName)

	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<Typography><b>{userName === '' || `${userName}님, ${title}`}</b></Typography>
					<IconButton className={classes.trailing} component={Link} to="/routine">
						<Badge badgeContent={numExercises} color="primary">
							<LocalMallOutlinedIcon />
						</Badge>
					</IconButton>
				</Toolbar>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h5" className={classes.typography}>
						<b>운동</b>
					</Typography>
					<IconButton onClick={() => setNavOpen(true)}>
						<CategoryOutlinedIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Toolbar />
			<Toolbar />

			<div className={classes.textField} onClick={() => setNavOpen(true)}>
				{hint}
			</div>

			<Toolbar />

			<Typography variant="h6" className={[classes.typography, classes.left].join(' ')}>
				<b>추천 운동</b>
			</Typography>

			<div className={classes.recommendedContainer}>
				{RECOMMENDED_EXERCISES.map((item) => {
					return (
						<div className={classes.recommendedCard} key={item.key}>
							<Card
								elevation={0}
								className={classes.card}
								onClick={() => console.log('ghi1')}
							>
								<CardHeader
									action={
										<IconButton
											color="primary"
											onClick={() => addExercise(item.key)}
										>
											<AddCircleIcon />
										</IconButton>
									}
								/>
								<div className={classes.space}></div>
								<CardContent>
									<Typography color="textSecondary">
										{item.exerciseParts.join(', ')}
									</Typography>
									<Typography>
										<b>{item.exerciseName}</b>
									</Typography>
								</CardContent>
							</Card>
						</div>
					);
				})}
			</div>

			<Drawer
				open={navOpen}
				anchor="right"
				classes={{ root: classes.drawerRoot, paper: classes.drawerPaper }}
				onClose={() => setNavOpen(false)}
			>
				<Toolbar />
				<Toolbar className={classes.toolbar}>
					<Typography>카테고리</Typography>
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
					<div className={classes.divider} />

					<div
						className={classes.greetings}
						onClick={() => 
							window.open('https://www.notion.so/rokdaehwa/5X5-1050538dd31d4165bf37504bbc099ea7')
								
						}
					>
						<Typography className={classes.drawerItem} variant="h6">
							반가워요 <span role='img' aria-label='lmao'>🤣</span>
						</Typography>
						<ChevronRightRoundedIcon />
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default HomeScreen;