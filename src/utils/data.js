export const MOCK_EXERCISES = [
	{
		created: Date(),
		key: '1',
		exerciseName: '벤치프레스',
		exerciseParts: ['가슴, 삼두'],
		exerciseSets: [
			{
				created: Date(),
				key: '11',
				weight: 100,
				reps: 100,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
			{
				created: Date(),
				key: '12',
				weight: 200,
				reps: 100,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
		],
	},
	{
		created: Date(),
		key: '2',
		exerciseName: '풀업',
		exerciseParts: ['전신, 등'],
		exerciseSets: [
			{
				created: Date(),
				key: '21',
				weight: 10,
				reps: 11,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
			{
				created: Date(),
				key: '22',
				weight: 12,
				reps: 13,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
		],
	},
	{
		created: Date(),
		key: '3',
		exerciseName: '신박한운동',
		exerciseParts: ['전신, 등'],
		exerciseSets: [
			{
				created: Date(),
				key: '30',
				weight: 10,
				reps: 11,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
			{
				created: Date(),
				key: '31',
				weight: 12,
				reps: 13,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
			{
				created: Date(),
				key: '32',
				weight: 0,
				reps: 20,
				repsUnit: '회',
				setReps: 3,
				done: [],
				finished: [],
			},
		],
	},
];

export const EXERCISE_DATA = [
	{ key: '가슴1', exerciseName: '벤치프레스', exerciseParts: ['가슴', '삼두'] },
	{ key: '가슴2', exerciseName: '덤벨프레스', exerciseParts: ['가슴'] },
	{ key: '가슴3', exerciseName: '덤벨플라이', exerciseParts: ['가슴'] },
	{ key: '가슴4', exerciseName: '딥스', exerciseParts: ['가슴'] },
	{ key: '가슴5', exerciseName: '인클라인 프레스', exerciseParts: ['가슴'] },
	{ key: '가슴6', exerciseName: '푸쉬 업', exerciseParts: ['가슴', '삼두', '어깨'] },
	{ key: '가슴7', exerciseName: '체스트 프레스', exerciseParts: ['가슴'] },
	{ key: '가슴8', exerciseName: '헤머 컬', exerciseParts: ['가슴'] },

	{ key: '등0', exerciseName: '풀업', exerciseParts: ['등'] },
	{ key: '등1', exerciseName: '원 암 덤벨로우', exerciseParts: ['등'] },
	{ key: '등2', exerciseName: '바벨로우', exerciseParts: ['등'] },
	{ key: '등3', exerciseName: '티바로우', exerciseParts: ['등'] },
	{ key: '등4', exerciseName: '씨티드로우', exerciseParts: ['등'] },
	{ key: '등5', exerciseName: '랫풀다운', exerciseParts: ['등'] },

	{ key: '어깨0', exerciseName: '숄더프레스', exerciseParts: ['어깨'] },
	{ key: '어깨1', exerciseName: '숄더 덤벨프레스', exerciseParts: ['어깨'] },
	{ key: '어깨2', exerciseName: '사이드 레터럴 레이즈', exerciseParts: ['어깨'] },
	{ key: '어깨3', exerciseName: '벤트 오버 레이즈', exerciseParts: ['어깨'] },
	{ key: '어깨4', exerciseName: '프론트 레이즈', exerciseParts: ['어깨'] },
	{ key: '어깨5', exerciseName: '밀리터리 프레스', exerciseParts: ['어깨'] },

	{ key: '이두0', exerciseName: '덤벨 컬', exerciseParts: ['이두'] },
	{ key: '이두1', exerciseName: '바벨 컬', exerciseParts: ['이두'] },
	{ key: '이두2', exerciseName: '친 업', exerciseParts: ['이두'] },

	{ key: '삼두0', exerciseName: '백 익스텐션', exerciseParts: ['삼두'] },
	{ key: '삼두1', exerciseName: '킥 백', exerciseParts: ['삼두'] },

	{ key: '하체0', exerciseName: '스쿼트', exerciseParts: ['하체'] },
	{ key: '하체1', exerciseName: '런지', exerciseParts: ['하체'] },

	{ key: '유산소0', exerciseName: '자전거', exerciseParts: ['유산소'] },
	{ key: '유산소1', exerciseName: '뜀걸음', exerciseParts: ['유산소'] },
	{ key: '유산소2', exerciseName: '농구', exerciseParts: ['유산소'] },
	{ key: '유산소3', exerciseName: '배드민턴', exerciseParts: ['유산소'] },

	{ key: '복근0', exerciseName: '크런치', exerciseParts: ['복근'] },
	{ key: '복근1', exerciseName: '플랭크', exerciseParts: ['복근'] },
	{ key: '복근2', exerciseName: '레그레이즈', exerciseParts: ['복근'] },
	{ key: '복근3', exerciseName: '행잉 레그레이즈', exerciseParts: ['복근'] },

	{ key: '코어0', exerciseName: '데드리프트', exerciseParts: ['전신', '등', '코어', '하체'] },
];

export const CATEGORIES = [
	{ key: 0, name: '유산소', to: 'cardio' },
	{ key: 1, name: '가슴', to: 'chest' },
	{ key: 2, name: '등', to: 'back' },
	{ key: 3, name: '어깨', to: 'shoulder' },
	{ key: 4, name: '이두', to: 'biceps' },
	{ key: 5, name: '삼두', to: 'triceps' },
	{ key: 6, name: '하체', to: 'legs' },
	{ key: 7, name: '복근', to: 'abs' },
];

export const RECOMMENDED_EXERCISES = [
	{
		key: '가슴1',
		exerciseName: '벤치프레스',
		exerciseParts: ['가슴', '삼두'],
		imgUrl: 'https://blog.nasm.org/hubfs/bench-press-biomechanics.jpg',
	},
	{
		key: '하체0',
		exerciseName: '스쿼트',
		exerciseParts: ['하체'],
		imgUrl:
			'https://images.unsplash.com/photo-1590771998996-8589ec9b5ac6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80',
	},
	{
		key: '코어0',
		exerciseName: '데드리프트',
		exerciseParts: ['전신', '등', '코어', '하체'],
		imgUrl:
			'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
	},
];

export function toExerciseName(param) {
	for (let i = 0; i < CATEGORIES.length; i++) {
		const item = CATEGORIES[i];
		if (item.to === param) {
			return item.name;
		}
	}
	return null;
}

export function getExercisesByName(exerciseData, name) {
	let result = [];
	for (let i = 0; i < exerciseData.length; i++) {
		const exercise = exerciseData[i];
		if (exercise.exerciseParts.includes(name)) {
			result.push(exercise);
		}
	}
	return result;
}