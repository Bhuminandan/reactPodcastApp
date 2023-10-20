import { createSlice } from "@reduxjs/toolkit";


// Slice for the podcasts
const podcastSlice = createSlice({
    name: 'podcasts',
    initialState: [],
    reducers: {

        // Setting the podcasts
        setPodcasts: (state, action) => {
            return action.payload;
        }

    }
})

// Exporting the actions
export const { setPodcasts } = podcastSlice.actions

// Exporting the reducer
export default podcastSlice.reducer
