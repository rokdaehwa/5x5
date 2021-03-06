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
		width: '100%',
		paddingTop: '50%',
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