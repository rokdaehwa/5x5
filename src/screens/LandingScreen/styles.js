import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '100vh',
	},
	appBar: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
	},
	toolbar: {
		width: '100%',
		height: 72,
		display: 'flex',
		alignItems: 'center',
		position: 'fixed',
	},
	space: {
		height: 72,
	},
	title: {
		marginLeft: 8,
		fontSize: 28,
		fontWeight: 900,
	},
	catch: {
		margin: 'auto',
		width: '100%',
		textAlign: 'center',
	},
	catchText: {
		fontWeight: 900,
		fontSize: 28,
	},
	btnStartContainer: {
		width: '100vw',
		marginBottom: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
	},
	highlight: {
		position: 'relative',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,

		'&:before': {
			width: '100%',
			content: '',
			height: 10,
			display: 'inline-block',
			background: '#D9FCDB',
			position: 'absolute',
			bottom: 0,
			left: 0,
			zIndex: -1,
			transition: '0.2s all',
		},
	},
	inputBase: {
		border: `0.5px solid ${theme.palette.common.grey}`,
		padding: theme.spacing(1),
		boxSizing: 'border-box',
		borderRadius: theme.spacing(0.5),
		marginBottom: theme.spacing(1),
	},
}));