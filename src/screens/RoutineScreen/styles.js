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
	contentContainer: {
		width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
	},
	titleContainer: {
		margin: theme.spacing(2),
		textAlign: 'center',
	},
	exercise: {
		outline: 'none',
		backgroundColor: theme.palette.common.white,
		margin: `${theme.spacing(2)}px 0px`,
	},
	setDragging: {
		// border: 'solid 1px #222222',
		// backgroundColor: theme.palette.primary.main,
		backgroundColor: theme.palette.common.white + 70,
		borderRadius: theme.spacing(1),
		boxShadow: `0px 0px ${theme.spacing(4)}px ${theme.palette.common.black + 30}`,
	},
	repsContainer: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
	},
	
	btnSetReps: {
		background: theme.palette.common.black + '2a',
		width: theme.spacing(3),
		height: theme.spacing(3),
		margin: theme.spacing(0.5),
		borderRadius: theme.spacing(0.5),
		'&:disabled': {
			color: theme.palette.common.black + '30',
			background: theme.palette.common.black + '1a',
		},
	},
	btnStartContainer: {
		width: '100vw',
		height: '15vh',
		position: 'fixed',
		left: 0,
		bottom: 0,
		background: 'linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, #FAFAFA 100%)',
	},
	btnStart: {
		width: '75vw',
		position: 'fixed',
		left: '12.5vw',
		bottom: theme.spacing(4),
	},
	fakeListItem: {
		height: 48, // height hard-coded
	},
	dialogInputContainer: {
		display: 'flex',
		padding: `0px ${theme.spacing(2)}px`,
		'& > *': {
			marginRight: theme.spacing(2),
		},
	},
	dialogInput: {
		width: `calc(100vw - ${2 * theme.spacing(2)}px)`,
		border: `0.5px solid ${theme.palette.common.grey}`,
		padding: theme.spacing(1.5),
		boxSizing: 'border-box',
		borderRadius: theme.spacing(0.5),
	},
}));