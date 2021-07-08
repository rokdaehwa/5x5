import React from 'react';
import MaterialChip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const Chip = (props) => {
	let newProps = {...props};
	delete newProps.color;
	const StyledChip = withStyles((theme) => {
		let color = props.color;
		switch (color) {
			case 'primary':
				color = theme.palette.primary.main;

				break;
			case 'secondary':
				color = theme.palette.secondary.main;
				break;
			case 'warning':
				color = theme.palette.warning.main;
				break;
			default:
		}
		return {
			root: {
				color: 'white',
				backgroundColor: `${color} !important`,
				'&:hover': {
					backgroundColor: color,
					filter: 'brightness(120%)',
				},
				'&:active': {
					boxShadow: 'none',
					backgroundColor: color,
					borderColor: color,
				},
			},
			outlined: {
				color: color,
				border: `1px solid ${color}`,
				backgroundColor: `transparent !important`,
			},
			icon: {
				color: props.variant === 'outlined' ? color : 'white',
			},
			deleteIcon: {
				color: props.variant === 'outlined' ? color : 'white',
			},
		};
	})(MaterialChip);

	return <StyledChip {...newProps}  />;
};

export default Chip;