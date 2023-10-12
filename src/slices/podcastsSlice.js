import { createSlice } from "@reduxjs/toolkit";

const podcastSlice = createSlice({
    name: 'podcasts',
    initialState: [],
    reducers: {
        setPodcasts: (state, action) => {
            return action.payload;
        }
    }
})

export const { setPodcasts } = podcastSlice.actions
export default podcastSlice.reducer
