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
		alignItems: 'center',
	},
	trailing: {
		marginLeft: 'auto',
	},
	link: {
		textDecoration: 'none'
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
		// flex: 1,
		display: 'flex',
		flexWrap: 'nowrap',
		overflowX: 'scroll',
		width: '100vw',
		marginTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	recommendedCard: {
		width: '60vw',
		margin: theme.spacing(2),
		flex: 'none',
	},
	card: {
		borderRadius: theme.spacing(4),
		backgroundColor: theme.palette.common.black + '0a',
		color: theme.palette.common.white,
	},
	iconButton: {
		width: 40,
		height: 40,
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