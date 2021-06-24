import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';

import { CATEGORIES } from 'utils/data.js';

import { useStyles } from './styles';

function CategoryDrawer(props) {
	const classes = useStyles();
	const { open, setOpen } = props;

	return (
		<Drawer
			open={open}
			anchor="right"
			classes={{ root: classes.drawerRoot, paper: classes.drawerPaper }}
			onClose={() => setOpen(false)}
		>
			<Toolbar />
			<Toolbar className={classes.toolbar}>
				<Typography>카테고리</Typography>
				<IconButton onClick={() => setOpen(false)}>
					<CloseOutlinedIcon className={classes.drawerItem} />
				</IconButton>
			</Toolbar>
			<div className={classes.drawerContent}>
				{CATEGORIES.map((item) => {
					return (
						<div key={item.key}>
							<Link to={`/category/${item.to}`} style={{ textDecoration: 'none' }}>
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
						window.open(
							'https://www.notion.so/rokdaehwa/5X5-1050538dd31d4165bf37504bbc099ea7'
						)
					}
				>
					<Typography className={classes.drawerItem} variant="h6">
						반가워요{' '}
						<span role="img" aria-label="lmao">
							🤣
						</span>
					</Typography>
					<ChevronRightRoundedIcon />
				</div>
			</div>
		</Drawer>
	);
}

export default CategoryDrawer;