import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
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