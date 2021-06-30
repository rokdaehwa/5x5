import React from 'react';
import dotenv from 'dotenv';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { myTheme } from 'utils/theme';

import AddExerciseScreen from 'screens/AddExerciseScreen';
import AdminScreen from 'screens/AdminScreen';
import CategoryDetailScreen from 'screens/CategoryDetailScreen';
import ExerciseDetailScreen from 'screens/ExerciseDetailScreen';
import HomeScreen from 'screens/HomeScreen';
import LandingScreen from 'screens/LandingScreen';
import LetsExercise from 'screens/LetsExercise';
import NotFoundScreen from 'screens/NotFoundScreen';
import RoutineScreen from 'screens/RoutineScreen';
import SearchInputScreen from 'screens/SearchInputScreen';

import TestScreen from 'screens/TestScreen';

import ErrorBoundary from 'screens/ErrorBoundary';

dotenv.config();
const theme = createMuiTheme(myTheme);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<ErrorBoundary>
					<Switch>
						<Route path="/" exact component={HomeScreen} />
						<Route path="/category/:to" exact component={CategoryDetailScreen} />
						<Route path="/detail/:key" exact component={ExerciseDetailScreen} />
						<Route path="/hello" exact component={LandingScreen} />
						<Route path="/exercise" exact component={LetsExercise} />
						<Route path="/routine" exact component={RoutineScreen} />
						<Route path="/search" exact component={SearchInputScreen} />
						<Route path="/search/:input" exact component={SearchInputScreen} />
						<Route path="/add" exact component={AddExerciseScreen} />

						<Route path={process.env.REACT_APP_ADMIN_ADDRESS} component={AdminScreen} />
						<Route path={process.env.REACT_APP_TEST_ADDRESS} component={TestScreen} />
						<Route component={NotFoundScreen} />
					</Switch>
				</ErrorBoundary>
			</Router>
		</ThemeProvider>
	);
}

export default App;