import React, { useState } from 'react';
import dotenv from 'dotenv';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { EXERCISE_DATA, MOCK_EXERCISES } from 'utils/data.js';
import { myTheme } from 'utils/theme.js';
import firebase, { database } from 'utils/firebase';

// TODO: SEARCH!!
// TODO: EXERCISE_DETAIL!!!
import AdminScreen from 'screens/AdminScreen';
import CategoryDetailScreen from 'screens/CategoryDetailScreen';
import HomeScreen from 'screens/HomeScreen';
import LandingScreen from 'screens/LandingScreen';
import LetsExercise from 'screens/LetsExercise';
import NotFoundScreen from 'screens/NotFoundScreen';
import RoutineScreen from 'screens/RoutineScreen';

import TestScreen from 'screens/TestScreen';

import ErrorBoundary from 'screens/ErrorBoundary';

dotenv.config();
const theme = createMuiTheme(myTheme);

function App() {
	const [exercises, setExercises] = useState([]);

	// timeStamp: { launched, started, ended, closed, lastUpdated }
	const [timeStamp, setTimeStamp] = useState({
		lauched: null,
		started: null,
		ended: null,
		closed: null,
		lastUpdated: null,
	});

	// userInfo: { userName, userEmail }
	const [userInfo, setUserInfo] = useState({
		userName: '',
		userEmail: '',
	});

	const date = new Date();
	const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

	const flush = () => {
		setExercises((before) => {
			let tmpExercises = [...before];
			tmpExercises.forEach((item) => {
				item.done = null;
				item.finished = null;
				item.exerciseSets.forEach((set) => {
					set.done = [];
					set.finished = [];
				});
			});
			console.log('flush!', tmpExercises);
			return tmpExercises;
		});
	};

	const handleSubmit = (userEmail) => {
		console.log('Submit started...');
		setUserInfo({ ...userInfo, userEmail });
		const collRef = database.collection('BetaTest');
		return collRef
			.add({
				userEmail,
				exercises,
				timeStamp,
			})
			.then((docRef) => {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<ErrorBoundary>
					<Switch>
						<Route path="/" exact>
							<HomeScreen />
						</Route>
						<Route path="/hello" exact>
							<LandingScreen />
						</Route>
						<Route path="/routine" exact>
							<RoutineScreen
								today={today}
								setExercises={setExercises}
							/>
						</Route>
						<Route path="/category/:to" exact>
							<CategoryDetailScreen />
						</Route>
						<Route path="/exercise" exact>
							<LetsExercise
								handleSubmit={handleSubmit}
								today={today}
								flush={flush}
							/>
						</Route>
						<Route path={process.env.REACT_APP_ADMIN_ADDRESS}>
							<AdminScreen />
						</Route>
						<Route path={process.env.REACT_APP_TEST_ADDRESS}>
							<TestScreen />
						</Route>
						<Route>
							<NotFoundScreen />
						</Route>
					</Switch>
				</ErrorBoundary>
			</Router>
		</ThemeProvider>
	);
}

export default App;