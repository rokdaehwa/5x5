/* eslint-disable */
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
		height: '100vh',
		backgroundColor: theme.palette.common.black,
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
		transform:' scaleX(-1)',
	}
}));

export default function TestScreen() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		console.info('You clicked the chipchip.');
	};
	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<div className={classes.trailing}>
						<Button className={classes.colorWhite} disableElevation>
							편집
						</Button>
						<IconButton size="small">
							<ExpandMore className={classes.colorWhite} />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Toolbar />

			<List component="nav" aria-label="main mailbox folders">
				<ListItem className={classes.listItem}>
					<ListItemText
						primary="벤치프레스"
						primaryTypographyProps={{
							variant: 'h6',
						}}
					/>
					<ListItemSecondaryAction>
						<Button className={classes.colorWhite}>추가</Button>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary={<div className={classes.listItemText}>20kg 15회</div>} />
					<ListItemSecondaryAction>
						<Chip
							icon={<CheckCircleRoundedIcon />}
							label="완료"
							onClick={handleClick}
							disabled
							color="primary"
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem className={classes.listItem} button>
					<ListItemText primary={<div className={classes.listItemText}>20kg 15회</div>} />
					<ListItemSecondaryAction>
						<Chip
							icon={<BarChartRoundedIcon />}
							label="4회 남음"
							onClick={handleClick}
							color="warning"
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary={<div className={classes.listItemText}>20kg 15회</div>} />
					<ListItemSecondaryAction>
						<Chip
							icon={<PlayCircleFilledRoundedIcon />}
							label="6회 남음"
							onClick={handleClick}
							color="warning"
							variant="outlined"
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem className={classes.listItem}>
					<ListItemText primary={<div className={classes.listItemText}>20kg 15회</div>} />
					<ListItemSecondaryAction>
						<Chip
							icon={<PlayCircleFilledRoundedIcon />}
							label="6회 남음"
							onClick={handleClick}
							color="warning"
							variant="outlined"
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem button onClick={handleOpen} className={classes.listItem}>
					<ListItemText primary="Inbox" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
			</List>

			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={[classes.nested, classes.listItem].join(' ')}>
						<ListItemText
							primary={<div className={classes.listItemText}>20kg 15회</div>}
						/>
						<ListItemSecondaryAction>
							<Chip
								icon={<PlayCircleFilledRoundedIcon />}
								label="6회 남음"
								onClick={handleClick}
								color="warning"
								variant="outlined"
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</Collapse>

			<ListItem className={classes.listItem}>
				<ListItemText
					secondary={<div className={classes.colorWhite}>벤치프레스 20kg 15회</div>}
				/>
				<Chip
							icon={<BarChartRoundedIcon />}
							label="4회 남음"
							onClick={handleClick}
							color="warning"
						/>
			</ListItem>
		</div>
	);
}