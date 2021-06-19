export const MOCK_EXERCISES = [
	{
		created: Date(),
		key: 0,
		exerciseName: '벤치프레스',
		exerciseParts: ['가슴, 삼두'],
		exerciseSets: [
			{
				created: Date(),
				key: 0,
				weight: 100,
				reps: 100,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
			{
				created: Date(),
				key: 1,
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
		key: 1,
		exerciseName: '신박한운동',
		exerciseParts: ['전신, 등'],
		exerciseSets: [
			{
				created: Date(),
				key: 0,
				weight: 10,
				reps: 11,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
			{
				created: Date(),
				key: 1,
				weight: 12,
				reps: 13,
				repsUnit: '회',
				setReps: 1,
				done: [],
				finished: [],
			},
		],
	},
];

export const EXERCISE_DATA = [
	{ key: 0, exerciseName: '벤치프레스', exerciseParts: ['가슴', '삼두'] },
	{ key: 1, exerciseName: '덤벨프레스', exerciseParts: ['가슴'] },
	{ key: '가슴7', exerciseName: '덤벨플라이', exerciseParts: ['가슴'] },
	{ key: 2, exerciseName: '딥스', exerciseParts: ['가슴'] },
	{ key: 3, exerciseName: '인클라인 프레스', exerciseParts: ['가슴'] },
	{ key: 4, exerciseName: '푸쉬 업', exerciseParts: ['가슴', '삼두', '어깨'] },
	{ key: 5, exerciseName: '체스트 프레스', exerciseParts: ['가슴'] },
	{ key: 6, exerciseName: '헤머 컬', exerciseParts: ['가슴'] },

	{ key: 7, exerciseName: '풀업', exerciseParts: ['등'] },
	{ key: 8, exerciseName: '원 암 덤벨로우', exerciseParts: ['등'] },
	{ key: 9, exerciseName: '바벨로우', exerciseParts: ['등'] },
	{ key: 10, exerciseName: '티바로우', exerciseParts: ['등'] },
	{ key: 11, exerciseName: '씨티드로우', exerciseParts: ['등'] },
	{ key: 12, exerciseName: '랫풀다운', exerciseParts: ['등'] },

	{ key: 13, exerciseName: '숄더프레스', exerciseParts: ['어깨'] },
	{ key: 14, exerciseName: '숄러 덤벨프레스', exerciseParts: ['어깨'] },
	{ key: 15, exerciseName: '사이드 레터럴 레이즈', exerciseParts: ['어깨'] },
	{ key: 16, exerciseName: '벤트 오버 레이즈', exerciseParts: ['어깨'] },
	{ key: 17, exerciseName: '프론트 레이즈', exerciseParts: ['어깨'] },
	{ key: 18, exerciseName: '밀리터리 프레스', exerciseParts: ['어깨'] },

	{ key: 19, exerciseName: '덤벨 컬', exerciseParts: ['이두'] },
	{ key: 20, exerciseName: '바벨 컬', exerciseParts: ['이두'] },
	{ key: 21, exerciseName: '친 업', exerciseParts: ['이두'] },

	{ key: 22, exerciseName: '백 익스텐션', exerciseParts: ['삼두'] },
	{ key: 23, exerciseName: '킥 백', exerciseParts: ['삼두'] },

	{ key: 24, exerciseName: '스쿼트', exerciseParts: ['하체'] },
	{ key: 25, exerciseName: '런지', exerciseParts: ['하체'] },

	{ key: 26, exerciseName: '자전거', exerciseParts: ['유산소'] },
	{ key: 27, exerciseName: '뜀걸음', exerciseParts: ['유산소'] },
	{ key: 28, exerciseName: '농구', exerciseParts: ['유산소'] },

	{ key: 29, exerciseName: '크런치', exerciseParts: ['유산소'] },
	{ key: 30, exerciseName: '플랭크', exerciseParts: ['유산소'] },
	{ key: 31, exerciseName: '레그레이즈', exerciseParts: ['유산소'] },
	{ key: 32, exerciseName: '행잉 레그레이즈', exerciseParts: ['유산소'] },

	{ key: 33, exerciseName: '데드리프트', exerciseParts: ['전신', '등', '코어', '하체'] },
];

export const CATEGORIES = [
	{ key: 0, name: '유산소', to: 'cardio' },
	{ key: 1, name: '가슴', to: 'chest' },
	{ key: 2, name: '등', to: 'back' },
	{ key: 3, name: '어깨', to: 'shoulder' },
	{ key: 4, name: '이두', to: 'biceps' },
	{ key: 5, name: '삼두', to: 'triceps' },
	{ key: 6, name: '하체', to: 'legs' },
	{ key: 7, name: '코어', to: 'core' },
];

export const RECOMMENDED_EXERCISES = [
	{ key: 0, exerciseName: '벤치프레스', exerciseParts: ['가슴', '삼두'], imgUrl: 'https://blog.nasm.org/hubfs/bench-press-biomechanics.jpg' },
	{ key: 24, exerciseName: '스쿼트', exerciseParts: ['하체'], imgUrl: 'https://blog.nasm.org/hubfs/bench-press-biomechanics.jpg' },
	{ key: 33, exerciseName: '데드리프트', exerciseParts: ['전신', '등', '코어', '하체'], imgUrl: 'https://blog.nasm.org/hubfs/bench-press-biomechanics.jpg' },
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

export function getExercisesByName(name) {
	let result = [];
	for (let i = 0; i < EXERCISE_DATA.length; i++) {
		const exercise = EXERCISE_DATA[i];
		if (exercise.exerciseParts.includes(name)) {
			result.push(exercise);
		}
	}
	return result;
}