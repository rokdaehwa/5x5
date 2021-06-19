export const myTheme = {
    palette: {
		// primary - theme color & routine color
		// secondary -> negative color #ff5d5d
		// error - negative color #ff5d5d
		// warning -> ?
		// info -> #4b7bff
		// success - positive color
        common: {
            black: '#222222',
            white: '#fafafa',
			grey: '#2222227f'
        },
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#01c6b2',
            // dark: will be calculated from palette.primary.main,
            contrastText: '#fafafa',
        },
		secondary: {
			main: '#ff5d5d'
		},
		error: {
			main: '#ff5d5d'
		},
		success: {
			main: '#35d48d'
		},
		info: {
			main: '#4b7bff'
		},
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
        text: {
            primary: '#222222',
        },
        background: {
            default: '#fafafa',
        },
    },
    typography: {
		fontFamily: "'Noto Sans KR', sans-serif",
        button: {
            textTransform: 'none',
        },
    },
};