/*
	Todo: 
		1. Edit List
			<Button className={classes.colorWhite} disableElevation>
				편집
			</Button>
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Chip from 'components/Chip';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';

import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ShortTextRoundedIcon from '@material-ui/icons/ShortTextRounded';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		// height: '100vh',
		backgroundColor: theme.palette.common.black,
		paddingBottom: theme.spacing(4),
	},
	appBar: {
		flexGrow: 1,
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	trailing: {
		marginLeft: 'auto',
	},
	listItemText: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	listItem: {
		backgroundColor: theme.palette.common.white + '09',
		color: theme.palette.common.white,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	colorWhite: {
		color: theme.palette.common.white,
	},
	flip: {
		transform: ' scaleX(-1)',
	},
	content: {
		height: '100vh',
		backgroundColor: theme.palette.common.black,
		overflow: 'auto',
	},
}));

export default function LetsRoutineScreen(props) {
	const { exercises, handleClose, keyInfo } = props;
	const classes = useStyles();
	const handleClick = () => {
		console.info('You clicked the chipchip.', keyInfo);
	};

	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<div className={classes.trailing}>
						<IconButton size="small" onClick={handleClose}>
							<ExpandMore className={classes.colorWhite} />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			<div className={classes.content}>
				<Toolbar />
				{exercises.map((item) => {
					return (
						<List key={item.key}>
							<ListItem className={classes.listItem}>
								<ListItemText
									primary={item.exerciseName}
									primaryTypographyProps={{
										variant: 'h6',
									}}
								/>
							</ListItem>
							{item.exerciseSets.map((set) => {
								const selected =
									item.key === keyInfo.exerciseKey && set.key === keyInfo.setKey;
								const getChip = () => {
									const left = set.setReps - set.done.length;
									const done = left === 0;
									const variant = selected || done ? 'default' : 'outlined';
									const label = done ? '완료' : `${left}회 남음`;
									const color = done ? 'primary' : 'warning';
									const icon = done ? (
										<CheckCircleRoundedIcon />
									) : selected ? (
										<BarChartRoundedIcon />
									) : null;
									return (
										<Chip
											icon={icon}
											label={label}
											color={color}
											variant={variant}
											disabled={done}
										/>
									);
								};
								return (
									<ListItem key={set.key} className={classes.listItem}>
										<ListItemText
											primary={`${
												parseInt(set.weight) === 0
													? '맨몸'
													: `${set.weight}kg`
											} ${set.reps}${set.repsUnit}`}
										/>
										{getChip()}
									</ListItem>
								);
							})}
						</List>
					);
				})}
			</div>
		</div>
	);
}