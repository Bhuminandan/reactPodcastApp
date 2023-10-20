import { createSlice } from "@reduxjs/toolkit";


// Slice for the podcast episodes
const podcastEpisodesSlice = createSlice({
    name: 'podcastEpisodes',
    initialState: [],
    reducers: {

        // Setting the podcast episodes
        setPodcastEpisodes: (state, action) => {
            return action.payload;
        }
    }
})

// Exporting the actions
export const { setPodcastEpisodes } = podcastEpisodesSlice.actions

// Exporting the reducer
export default podcastEpisodesSlice.reducer