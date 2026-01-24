import { createSlice } from '@reduxjs/toolkit'

const groups = [
	'Porsche Performance',
	'Ferrari Fast-Track',
	'BMW Blue-Ribbon',
	'Mercedes Mastery',
	'Lamborghini Leaders',
	'Audi Academic',
]

const generateStudents = count => {
	const students = []
	// current user profile
	students.push({
		id: 'me',
		name: 'Alex Johnson (You)',
		avatar: 'AJ',
		math: 760,
		rw: 720,
		mathCorrect: 412,
		mathTotal: 440,
		rwCorrect: 398,
		rwTotal: 440,
		accuracy: 94.2,
		correctAnswers: 810,
		totalQuestions: 880,
		mathMedian: 755,
		rwMedian: 715,
		timeSpent: 342, // in hours
		growth: 4.2,
		group: 'Porsche Performance',
		trend: 'up',
		lastActive: 'Just now',
		competitionIds: ['c1', 'c2', 'c4'],
		compCorrectAnswers: 48, // out of 54
	})

	const names = [
		'Pierce',
		'Chen',
		'Thorne',
		'Rodriguez',
		'Nguyen',
		'Rossi',
		'Kim',
		'Loren',
		'Vane',
		'Wong',
		'Isaac',
		'Cruz',
		'Muller',
		'Sato',
		'Silva',
		'Lee',
		'Gomez',
		'Smith',
		'Doe',
		'Brown',
	]
	const firstNames = [
		'Alexander',
		'Sarah',
		'Marcus',
		'Elena',
		'Liam',
		'Isabella',
		'David',
		'Sophia',
		'Julian',
		'Mia',
		'Oscar',
		'Penelope',
		'Hans',
		'Yuki',
		'Carlos',
		'Ji-won',
		'Maria',
		'John',
		'Jane',
		'Charlie',
	]

	// generate mock students
	for (let i = 0; i < count - 1; i++) {
		const fName = firstNames[i % firstNames.length]
		const lName = names[Math.floor(Math.random() * names.length)]
		const group = groups[i % groups.length]

		const math = 600 + Math.floor(Math.random() * 201)
		const rw = 600 + Math.floor(Math.random() * 201)

		const mTotal = 440
		const rTotal = 440
		// answer accuracy - between 65-99% correct
		const mCorrect = Math.floor(mTotal * (0.65 + Math.random() * 0.34))
		const rCorrect = Math.floor(rTotal * (0.65 + Math.random() * 0.34))

		students.push({
			id: `s-${i}`,
			name: `${fName} ${lName}`,
			avatar: fName[0] + lName[0],
			math,
			rw,
			mathCorrect: mCorrect,
			mathTotal: mTotal,
			rwCorrect: rCorrect,
			rwTotal: rTotal,
			accuracy:
				Math.round(((mCorrect + rCorrect) / (mTotal + rTotal)) * 1000) / 10,
			correctAnswers: mCorrect + rCorrect,
			totalQuestions: mTotal + rTotal,
			mathMedian: math - 10 + Math.floor(Math.random() * 20),
			rwMedian: rw - 10 + Math.floor(Math.random() * 20),
			timeSpent: 50 + Math.floor(Math.random() * 450),
			growth: Math.round((Math.random() * 10 - 2) * 10) / 10,
			group: group,
			trend:
				Math.random() > 0.6 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
			lastActive: Math.floor(Math.random() * 60) + 'm ago',
			competitionIds: Math.random() > 0.5 ? ['c1', 'c4'] : ['c2', 'c4'],
			compCorrectAnswers: Math.floor(Math.random() * 54),
		})
	}
	return students
}

const initialStudents = generateStudents(50)

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		allStudents: initialStudents,
		activeCompetitionId: null,
		filters: {
			group: 'All',
			subject: 'Both', // 'Both', 'Math', 'English'
		},
	},
	reducers: {
		setGroupFilter: (state, action) => {
			state.filters.group = action.payload
		},
		setSubjectFilter: (state, action) => {
			state.filters.subject = action.payload
		},
		enterCompetition: (state, action) => {
			state.activeCompetitionId = action.payload
		},
		exitCompetition: state => {
			state.activeCompetitionId = null
		},
	},
})

export const {
	setGroupFilter,
	setSubjectFilter,
	enterCompetition,
	exitCompetition,
} = usersSlice.actions

export const selectFilteredStudents = state => {
	const { allStudents, filters, activeCompetitionId } = state.users

	let students = [...allStudents]

	// filter by competition or group
	if (activeCompetitionId) {
		students = students.filter(s =>
			s.competitionIds.includes(activeCompetitionId),
		)
	} else if (filters.group !== 'All') {
		students = students.filter(s => s.group === filters.group)
	}

	return students
		.map(s => {
			let rankScore = 0
			let displayCorrect = 0
			let displayTotal = 0

			if (activeCompetitionId) {
				rankScore = s.compCorrectAnswers / 54
				displayCorrect = s.compCorrectAnswers
				displayTotal = 54
			} else {
				// use subject filter to show relevant metrics
				if (filters.subject === 'Math') {
					rankScore = s.mathCorrect / s.mathTotal
					displayCorrect = s.mathCorrect
					displayTotal = s.mathTotal
				} else if (filters.subject === 'English') {
					rankScore = s.rwCorrect / s.rwTotal
					displayCorrect = s.rwCorrect
					displayTotal = s.rwTotal
				} else {
					rankScore = s.correctAnswers / s.totalQuestions
					displayCorrect = s.correctAnswers
					displayTotal = s.totalQuestions
				}
			}

			return { ...s, rankScore, displayCorrect, displayTotal }
		})
		.sort((a, b) => b.rankScore - a.rankScore)
}

export default usersSlice.reducer
