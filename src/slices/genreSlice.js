import { createSlice } from "@reduxjs/toolkit";

// Slice for the genre
const genreSlice = createSlice({
    name: 'genre',
    initialState: {
        genre: '',
    },
    reducers: {
        // Setting the genre
        setGenre: (state, action) => {
            state.genre = action.payload
        }
    }
})

// Exporting the actions
export const { setGenre } = genreSlice.actions;

// Exporting the reducer
export default genreSlice.reducer;