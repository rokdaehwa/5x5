import React, { useState, useEffect } from 'react';

import LetsStartScreen from './LetsStartScreen';
import LetsEndScreen from './LetsEndScreen';
import LetsExerciseScreen from './LetsExerciseScreen';
import LetsResultScreen from './LetsResultScreen';

function LetsExercise(props) {
	const [list, setList] = useState([]);
	const [index, setIndex] = useState(-1);
	const [isRest, setIsRest] = useState(false);

	const { flush, exercises, pushExerciseSetInfo, today, handleSubmit } = props;

	console.log('lets get it', exercises);

	useEffect(() => {
		let newList = [];
		for (let i = 0; i < exercises.length; i++) {
			const item = exercises[i];
			const sets = item.exerciseSets;

			if (sets.length === 0) {
				let newListItem = {};
				newListItem.exerciseKey = item.key;
				newListItem.setKey = null;
				newListItem.setIndex = null;
				newList.push(newListItem);
				console.log('0', newListItem);
			} else {
				for (let j = 0; j < sets.length; j++) {
					let newListItem = {};
					for (let k = 0; k < sets[j].setReps; k++) {
						newListItem.exerciseKey = item.key;
						newListItem.setKey = item.exerciseSets[j].key;
						newListItem.setIndex = k;
						newList.push(newListItem);
					}
				}
			}
		}
		console.log('newList', newList);
		setList(newList);
	}, []);

	const handleNext = () => {
		setIndex(index + 1);
	};

	const handleExerciseToRest = (done) => {
		console.log('to the next round!');
		// const info = list[index];
		// pushExerciseSetInfo(info.exerciseKey, info.setKey, info.setIndex, {
		// 	done: done,
		// 	finished: Date(),
		// });
		// setIsRest(true);
	};
	
	const handleNextExercise = (done) => {
		console.log('to the next round!');
		const info = list[index];
		pushExerciseSetInfo(info.exerciseKey, info.setKey, info.setIndex, {
			done: done,
			finished: Date(),
		});
	}

	const handleRestToExercise = () => {
		setIndex(index + 1);
		setIsRest(false);
	};

	const getSetInfo = (i = index) => {
		if (i >= list.length) return null;
		const curr = list[i];

		const currExercise = exercises.find((item) => item.key === curr.exerciseKey);
		const currSet = currExercise.exerciseSets.find((item) => item.key === curr.setKey);

		if (currSet === undefined)
			return {
				exerciseName: currExercise.exerciseName,
				exerciseParts: currExercise.exerciseParts,
				set: null,
			};

		const set =
			parseInt(currSet.weight) === 0
				? `맨몸 ${currSet.reps}${currSet.repsUnit}`
				: `${currSet.weight}kg ${currSet.reps}${currSet.repsUnit}`;

		return {
			exerciseName: currExercise.exerciseName,
			exerciseParts: currExercise.exerciseParts,
			set,
		};
	};

	const getCurrentScreen = () => {
		const total = list.length;
		if (index <= -1) return <LetsStartScreen today={today} exercises={exercises} handleNext={handleNext} />;
		else if (index <= total - 1) {
			return <LetsExerciseScreen
						handleNext={handleNextExercise}
						getSetInfo={getSetInfo}
					   index={index}
					   numList={list.length}
						flush={flush}
					   setIndex={setIndex}
					/>;
		} else if (index === total) return <LetsEndScreen handleNext={handleNext} />;
		else if (index === total + 1)
			return <LetsResultScreen flush={flush} exercises={exercises} today={today} handleSubmit={handleSubmit}/>;
		return 'Something went wrong';
	};

	return <div>{getCurrentScreen()}</div>;
}

export default LetsExercise;