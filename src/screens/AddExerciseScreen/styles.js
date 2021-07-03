import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
		width:  theme.spacing(4),
		height: theme.spacing(4),
	},
	body: {
		width: '100%',
		padding: theme.spacing(2),
	},
	textField: {
		width: `calc(100vw - ${2 * theme.spacing(2)}px)`,
		border: `0.5px solid ${theme.palette.common.grey}`,
		padding: theme.spacing(1.5),
		boxSizing: 'border-box',
		borderRadius: theme.spacing(0.5),
	},
}));