import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice.js'

// redux store setup
export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
})
