import { createSlice } from "@reduxjs/toolkit";

// Slice for the user
const userSlice = createSlice({
    name: "user",
    initialState: {
        favorites: [],
    },
    reducers: {
        // Setting the user
        setUser: (state, action) => {
            state.user = action.payload
        },

        // Clearing the user
        clearUser: (state, action) => {
            state.user = null
        }
    },
})

// Exporting the actions
export const { setUser, clearUser } = userSlice.actions

// Exporting the reducer
export default userSlice.reducer