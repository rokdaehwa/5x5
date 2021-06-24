import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

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

function SearchInputScreen() {
	const classes = useStyles();
	const history = useHistory();

	return (
		<div>
			<AppBar classes={{ root: classes.appBar }} elevation={0} position="fixed">
				<Toolbar>
					<IconButton onClick={() => history.goBack()}>
						<ArrowBackIosOutlinedIcon />
					</IconButton>
					<form action="#">
						<InputBase
							placeholder="autoComplete 기능 추가하기"
							inputProps={{ 'aria-label': 'search' }}
							type="text"
							endAdornment={
								<InputAdornment>
									<IconButton>
										<CancelIcon />
									</IconButton>
								</InputAdornment>
							}
							autoFocus
						/>
					</form>
					<IconButton>
						<Badge badgeContent={1} color="primary">
							<LocalMallOutlinedIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>

			<Toolbar />
			<Toolbar />
			
			<h1>기능 구현 중입니다,,</h1>
		</div>
	);
}

export default SearchInputScreen;