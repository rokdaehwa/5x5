import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		// alignItems: 'center',
	},
	appBar: {
		flexGrow: 1,
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
	},
	form: {
		// display: 'flex',
		// justifyContent: 'space-between',
		width: '100%',
	},
	btnAdd: {
		margin: theme.spacing(2),
	},
	snackbar: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		fontSize: 16,
		fontWeight: 700,
		width: `calc(100% - ${theme.spacing(2)}px)`,
		textAlign: 'center',
		padding: theme.spacing(1),
		borderRadius: theme.spacing(1)
	}
}));