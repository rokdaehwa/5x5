import React, { useState } from 'react';
import dotenv from 'dotenv';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { EXERCISE_DATA, MOCK_EXERCISES } from './utils/data.js';
import { myTheme } from './utils/theme.js';
import firebase, { database } from './utils/firebase';

// TODO: SEARCH!!
// TODO: EXERCISE_DETAIL!!!
import AdminScreen from './screens/AdminScreen';
import CategoryDetailScreen from './screens/CategoryDetailScreen';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import LetsExercise from './screens/LetsExercise';
import NotFoundScreen from './screens/NotFoundScreen';
import RoutineScreen from './screens/RoutineScreen';

import TestScreen from './screens/TestScreen';

dotenv.config();
const theme = createMuiTheme(myTheme);

// https://github.com/konstantinmuenster/notion-clone/tree/master/frontend
// https://notion-clone.kmuenster.com/p/60bdf877dde8f8002440c30e?public=true
// https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc

function App() {
	// exercises: [ Exercise ]
	// Exercise: { created, key, exerciseName, exerciseParts, exerciseSets }
	// Set: { created, weight, reps, repsUnit, setReps, done, finished  }
	const [exercises, setExercises] = useState(MOCK_EXERCISES);
	// const [exercises, setExercises] = useState([]);

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

	const handleSetReps = (mode, exerciseKey, setKey) => {
		if (mode === null || exerciseKey === null || setKey === null) return;

		setExercises((before) => {
			let tmpExercises = [...before];
			const exerciseIndex = tmpExercises.findIndex((item) => item.key === exerciseKey);
			let tmpExercise = tmpExercises[exerciseIndex];
			const setIndex = tmpExercise.exerciseSets.findIndex((item) => item.key === setKey);
			let setReps = tmpExercise.exerciseSets[setIndex].setReps;
			if (mode === 'increment') {
				tmpExercise.exerciseSets[setIndex].setReps += 1;
			} else if (mode === 'decrement') {
				if (setReps > 0) {
					tmpExercise.exerciseSets[setIndex].setReps -= 1;
				}
			}
			return tmpExercises;
		});
	};

	const addExercise = (exerciseKey) => {
		if (exerciseKey === null) return;
		const newExercise = EXERCISE_DATA.find((item) => item.key === exerciseKey);

		if (newExercise === null) return; // no such item

		const newExerciseItem = {
			created: Date(),
			key: Date.now(),
			exerciseName: newExercise.exerciseName,
			exerciseParts: newExercise.exerciseParts,
			exerciseSets: [],
			done: null,
			finished: null,
		};

		setExercises((before) => {
			let tmpExercises = [...before];
			tmpExercises.push(newExerciseItem);
			return tmpExercises;
		});
	};

	const deleteExercise = (exerciseKey) => {
		if (exerciseKey === null) return;

		setExercises((before) => {
			let tmpExercises = [...before];
			const exerciseIndex = tmpExercises.findIndex((item) => item.key === exerciseKey);
			tmpExercises.splice(exerciseIndex, 1);
			return tmpExercises;
		});
	};

	const addExerciseSet = (exerciseKey, info) => {
		if (exerciseKey === null || info === null) return;
		const setInfo = {
			...info,
			created: Date.now(),
			updated: Date.now(),
			key: Date.now(),
			setReps: 1,
			done: [],
			finished: [],
		};

		setExercises((before) => {
			let tmpExercises = [...before];
			const exerciseIndex = tmpExercises.findIndex((item) => item.key === exerciseKey);
			let tmpExercise = tmpExercises[exerciseIndex];
			tmpExercise.exerciseSets.push(setInfo);
			return tmpExercises;
		});
	};

	const updateExerciseSet = (exerciseKey, setKey, info) => {
		if (exerciseKey === null || setKey === null || info === null) return;

		setExercises((before) => {
			let tmpExercises = [...before];
			const exerciseIndex = tmpExercises.findIndex((item) => item.key === exerciseKey);
			let tmpExercise = tmpExercises[exerciseIndex];
			const setIndex = tmpExercise.exerciseSets.findIndex((item) => item.key === setKey);
			const tmpSet = tmpExercise.exerciseSets[setIndex];
			tmpSet.weight = info.weight;
			tmpSet.reps = info.reps;
			tmpSet.repsUnit = info.repsUnit;
			return tmpExercises;
		});
	};

	const deleteExerciseSet = (exerciseKey, setKey) => {
		if (exerciseKey === null || setKey === null) return;

		setExercises((before) => {
			let tmpExercises = [...before];
			const exerciseIndex = tmpExercises.findIndex((item) => item.key === exerciseKey);
			let tmpExercise = tmpExercises[exerciseIndex];
			const setIndex = tmpExercise.exerciseSets.findIndex((item) => item.key === setKey);
			tmpExercise.exerciseSets.splice(setIndex, 1);
			return tmpExercises;
		});
	};

	const pushExerciseSetInfo = (exerciseKey, setKey, setInfoIndex, info) => {
		if (exerciseKey === null || info === null) return;

		console.log('updated!', exerciseKey, setKey, setInfoIndex, info);

		setExercises((before) => {
			let tmpExercises = [...before];
			const exerciseIndex = tmpExercises.findIndex((item) => item.key === exerciseKey);
			let tmpExercise = tmpExercises[exerciseIndex];
			if (setKey === null || setInfoIndex === null) {
				tmpExercise.done = info.done;
				tmpExercise.finished = info.finished;
				return tmpExercises;
			}
			const setIndex = tmpExercise.exerciseSets.findIndex((item) => item.key === setKey);
			console.log(tmpExercise.exerciseSets[setIndex]);
			tmpExercise.exerciseSets[setIndex].done.push(info.done);
			tmpExercise.exerciseSets[setIndex].finished.push(info.finished);
			return tmpExercises;
		});
	};

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
				<Switch>
					<Route path="/" exact>
						<HomeScreen numExercises={exercises.length} addExercise={addExercise} userName={userInfo.userName}/>
					</Route>
					<Route path="/hello" exact>
						<LandingScreen userInfo={userInfo} setUserInfo={setUserInfo}/>
					</Route>
					<Route path="/routine" exact>
						<RoutineScreen
							today={today}
							exercises={exercises}
							addExerciseSet={addExerciseSet}
							handleSetReps={handleSetReps}
							deleteExercise={deleteExercise}
							deleteExerciseSet={deleteExerciseSet}
							updateExerciseSet={updateExerciseSet}
							setExercises={setExercises}
						/>
					</Route>
					<Route path="/category/:to" exact>
						<CategoryDetailScreen
							addExercise={addExercise}
							numExercises={exercises.length}
						/>
					</Route>
					<Route path="/exercise" exact>
						<LetsExercise
							handleSubmit={handleSubmit}
							today={today}
							flush={flush}
							exercises={exercises}
							pushExerciseSetInfo={pushExerciseSetInfo}
						/>
					</Route>
					<Route path={process.env.REACT_APP_ADMIN_ADDRESS}>
						<AdminScreen />
					</Route>
					<Route path={process.env.REACT_APP_TEST_ADDRESS}>
						<TestScreen exercises={exercises} setExercises={setExercises} />
					</Route>
					<Route>
						<NotFoundScreen />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;