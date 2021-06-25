import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

import CategoryDrawer from 'components/CategoryDrawer';
import { RECOMMENDED_EXERCISES } from 'utils/data.js';

import { useStyles } from './styles';

function HomeScreen(props) {
	const classes = useStyles();
	const { numExercises, addExercise, userName } = props;
	const [navOpen, setNavOpen] = useState(false);
	// TODO: exercise.length 따라서 hint text 바꿔보자
	const title = '반갑습니다!';
	const hint = '어떤 운동으로 시작해볼까요?';
	
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

			<Typography variant="h6" className={classes.left}>
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

			<CategoryDrawer open={navOpen} setOpen={setNavOpen}/>
		</div>
	);
}

export default HomeScreen;