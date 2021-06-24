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
		flex: 1,
		display: 'flex',
		flexWrap: 'nowrap',
		overflow: 'scroll',
		width: '100vw',
		paddingLeft: theme.spacing(2),
		marginTop: theme.spacing(4),
		marginLeft: theme.spacing(2),
	},
	recommendedCard: {
		width: '60vw',
		marginRight: theme.spacing(4),
		height: '100vw',
		flex: 'none',
	},

	card: {
		borderRadius: theme.spacing(4),
		backgroundColor: theme.palette.common.black + '0a',
	},
	space: {
		width: '100%',
		paddingTop: '50%',
	},
}));